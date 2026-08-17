"use client";
import { useState } from "react";
import { Pagination } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./personagens.module.css";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import CharacterModal from "../../components/CharacterModal/CharacterModal";

const getPersonagemKey = (personagem) => {
  const id =
    personagem?.id ??
    `${personagem?.name ?? "personagem"}-${personagem?.actor ?? "sem-ator"}`;

  return String(id);
};

const ITENS_POR_PAGINA = 12;

export default function Personagens() {
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);
  const [favoritos, setFavoritos] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);

  const buscarPersonagens = async () => {
    setLoading(true);
    setErro("");
    setPersonagemSelecionado(null);
    setPaginaAtual(1);

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

  const alternarFavorito = (personagem) => {
    const chave = getPersonagemKey(personagem);

    setFavoritos((favoritosAtuais) => {
      const jaFavoritado = Boolean(favoritosAtuais[chave]);
      const proximoFavoritos = { ...favoritosAtuais };

      if (jaFavoritado) {
        delete proximoFavoritos[chave];
        toast.info(`${personagem.name} removido dos favoritos.`);
      } else {
        proximoFavoritos[chave] = personagem;
        toast.success(`${personagem.name} adicionado aos favoritos.`);
      }

      return proximoFavoritos;
    });
  };

  const personagensComImagem =
    resultado?.filter((personagem) => personagem.image) ?? [];
  const personagensArquivados =
    resultado?.filter((personagem) => !personagem.image) ?? [];

  const indiceInicial = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const personagensPaginaAtual = personagensComImagem.slice(
    indiceInicial,
    indiceInicial + ITENS_POR_PAGINA,
  );

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
              {personagensPaginaAtual.map((personagem, index) => (
                <CharacterCard
                  key={`${getPersonagemKey(personagem)}-${index}`}
                  personagem={personagem}
                  onClick={setPersonagemSelecionado}
                  onToggleFavorito={alternarFavorito}
                  isFavorito={Boolean(favoritos[getPersonagemKey(personagem)])}
                />
              ))}
            </ul>
            {personagensComImagem.length > ITENS_POR_PAGINA && (
              <div className={styles.paginationWrapper}>
                <Pagination
                  current={paginaAtual}
                  pageSize={ITENS_POR_PAGINA}
                  total={personagensComImagem.length}
                  onChange={setPaginaAtual}
                  showSizeChanger={false}
                  showQuickJumper={false}
                  size="default"
                />
              </div>
            )}
          </section>
        </>
      )}
      {resultado && personagensArquivados.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.tituloSecao}>Personagens arquivados</h2>
          <ul className={styles.listaArquivados}>
            {personagensArquivados.map((personagem, index) => (
              <CharacterCard
                key={`${getPersonagemKey(personagem)}-${index}`}
                personagem={personagem}
                onClick={setPersonagemSelecionado}
                onToggleFavorito={alternarFavorito}
                isFavorito={Boolean(favoritos[getPersonagemKey(personagem)])}
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
