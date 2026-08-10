"use client";
import { useState } from "react";
import axios from "axios";
import Toast from "react-hot-toast";

export default function Personagens() {
  const [personagem, setPersonagem] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(" ");
  const [loading, setLoading] = useState(false);

  const buscarPersonagem = async () => {
    setLoading(true);
    setErro("");

    try {
      const { data } = await axios.get(
        `https://hp-api.onrender.com/api/characters/?name=${personagem}`,
      );
      setResultado(data.characters[0]);
    } catch {
      setErro("Personagem não encontrado.");
    } finally {
      setLoading(false);
    }
    console.error("Erro ao buscar personagem:", erro);

    
  };
  
  return (
    <div>
      <input
        value={personagem}
        onChange={(e) => setPersonagem(e.target.value)}
        placeholder="Digite um personagem"
      />
      <button onClick={buscarPersonagem}>
        {loading ? "Buscando..." : "Buscar"}
      </button> 

      {resultado && <p>{resultado.name}</p>}
      {erro && <p>{erro}</p>}
      
    </div>
    
  );
  
}
