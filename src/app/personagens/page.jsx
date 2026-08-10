"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';

export default function Personagens() {
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarPersonagens = async () => {
    setLoading(true);
    setErro("");

    try {
      const { data } = await axios.get(
        `https://hp-api.onrender.com/api/characters/`,
      );
      setResultado(data);
    } catch {
      toast.error("Personagens não encontrados.");
      setErro("Personagens não encontrados.");
    } finally {
      setLoading(false);
    }

    const showSuccess = () => toast.success("Sucesso!");

    const showError = () => toast.error("Erro!");

    const showPromise = () => {
        const promise = new Promise((resolve, reject) =>
            setTimeout(() => (Math.random() > 0.5 ? resolve() : reject()), 2000)
        );

        toast.promise(promise, {
            loading: "Carregando...",
            success: "Concluído!",
            error: "Falhou!",
        });
    };
  };

  
  return (
    <div>
      <button onClick={buscarPersonagens}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
      <Toaster />
      {resultado && (
        <ul>
          {resultado.map((personagem, index) => (
            <li key={`${personagem.name}-${index}`}>
              <h3>{personagem.name}</h3>
              <p>Casa: {personagem.house}</p>
              <p>Espécie: {personagem.species}</p>
              <p>Gênero: {personagem.gender}</p>
              <p>Data de Nascimento: {personagem.dateOfBirth}</p>
              <p>Patrono: {personagem.patronus}</p>
              <p>Ator: {personagem.actor}</p>
              {personagem.image && (
                <Image
                  src={personagem.image}
                  alt={personagem.name}
                  width={240}
                  height={320}
                  sizes="240px"
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {erro && <p>{erro}</p>}
      
    </div>
  );
}
