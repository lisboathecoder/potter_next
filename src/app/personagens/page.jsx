"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./personagens.module.css";

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
                <li className={styles.card} key={`${personagem.name}-${index}`}>
                  <button
                    type="button"
                    className={styles.imagemBotao}
                    onClick={() => setPersonagemSelecionado(personagem)}
                    aria-label={`Ver detalhes de ${personagem.name}`}
                  >
                    <Image
                      src={personagem.image}
                      alt={personagem.name}
                      width={240}
                      height={320}
                      sizes="(max-width: 768px) 45vw, 240px"
                      className={styles.imagem}
                    />
                  </button>
                  <h3 className={styles.nome}>{personagem.name}</h3>
                </li>
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
              <li key={`${personagem.name}-${index}`}>
                <button
                  type="button"
                  className={styles.arquivadoBotao}
                  onClick={() => setPersonagemSelecionado(personagem)}
                  aria-label={`Ver detalhes de ${personagem.name}`}
                >
                  <strong>{personagem.name}</strong>
                  <span>Sem imagem disponível</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {personagemSelecionado && (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onClick={() => setPersonagemSelecionado(null)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="detalhes-personagem"
            onClick={(event) => event.stopPropagation()}

          >
            <button
              type="button"
              className={styles.fechar}
              onClick={() => setPersonagemSelecionado(null)}
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h2 id="detalhes-personagem" className={styles.modalTitulo}>
              {personagemSelecionado.name}
            </h2>
            <div className={styles.modalConteudo}>
              {personagemSelecionado.image && (
                <Image
                  src={personagemSelecionado.image}
                  alt={personagemSelecionado.name}
                  width={240}
                  height={320}
                  sizes="240px"
                  className={styles.modalImagem}
                  quality={100}
                />
              )}
              <div className={styles.modalDetalhes}>
                <p>Casa: {valorOuNaoInformado(personagemSelecionado.house)}</p>
                <p>Espécie: {valorOuNaoInformado(personagemSelecionado.species)}</p>
                <p>Gênero: {valorOuNaoInformado(personagemSelecionado.gender)}</p>
                <p>
                  Data de Nascimento: {valorOuNaoInformado(personagemSelecionado.dateOfBirth)}
                </p>
                <p>Patrono: {valorOuNaoInformado(personagemSelecionado.patronus)}</p>
                <p>Ator: {valorOuNaoInformado(personagemSelecionado.actor)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
