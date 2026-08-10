"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./personagens.module.css";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import CharacterModal from "../../components/CharacterModal/CharacterModal";

export default function Personagens() {
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);

  const buscarPersonagens = async () => {
    setLoading(true);
    setErro("");
    setPersonagemSelecionado(null);

    try {
      const { data } = await axios.get(
        `https://hp-api.onrender.com/api/characters/`,
      );
      setResultado(data);
      toast.success("Personagens encontrados com sucesso!");
    } catch {
      toast.error("Personagens não encontrados.");
      setErro("Personagens não encontrados.");
    } finally {
      setLoading(false);
    }
  };

  const personagensComImagem = resultado?.filter((personagem) => personagem.image) ?? [];
  const personagensArquivados = resultado?.filter((personagem) => !personagem.image) ?? [];

  const valorOuNaoInformado = (valor) => valor || "Não informado";

  return (
    <div className={styles.page}>
      <h1 className={styles.titulo}>Personagens da Harry Potter API</h1>
      <p className={styles.descricao}>
        Aqui você pode encontrar todos os personagens da série Harry Potter.
      </p>
      <button className={styles.botaoBuscar} onClick={buscarPersonagens}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      )}
      {erro && <p className={styles.erro}>{erro}</p>}

      {resultado && (
        <>
          <section className={styles.section}>
            <h2 className={styles.tituloSecao}>Personagens com imagem</h2>
            <ul className={styles.grid}>
              {personagensComImagem.map((personagem, index) => (
                <CharacterCard
                  key={`${personagem.name}-${index}`}
                  personagem={personagem}
                  onClick={setPersonagemSelecionado}
                />
              ))}
            </ul>
          </section>
        </>
      )}
      {resultado && personagensArquivados.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.tituloSecao}>Personagens arquivados</h2>
          <ul className={styles.listaArquivados}>
            {personagensArquivados.map((personagem, index) => (
              <CharacterCard
                key={`${personagem.name}-${index}`}
                personagem={personagem}
                onClick={setPersonagemSelecionado}
              />
            ))}
          </ul>
        </section>
      )}

      {personagemSelecionado && (
        <CharacterModal
          personagem={personagemSelecionado}
          onClose={() => setPersonagemSelecionado(null)}
        />
      )}
    </div>
  );
}
