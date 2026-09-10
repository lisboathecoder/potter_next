"use client";
import { Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import CharacterModal from "../../components/CharacterModal/CharacterModal";
import styles from "./personagens.module.css";

const getPersonagemKey = (personagem) => {
  const id =
    personagem?.id ??
    `${personagem?.name ?? "personagem"}-${personagem?.actor ?? "sem-ator"}`;

  return String(id);
};

const ITENS_POR_PAGINA = 12;
const FAVORITOS_KEY = "favoritos";

const lerStorage = (storage, chave, fallback) => {
  const valor = storage.getItem(chave);

  if (!valor) {
    return fallback;
  }

  try {
    return JSON.parse(valor);
  } catch (error) {
    console.error(`Não foi possível ler ${chave} do storage:`, error);
    return fallback;
  }
};

const normalizarPersonagens = (dados) =>
  Array.isArray(dados)
    ? dados
    : dados && typeof dados === "object"
      ? Object.values(dados)
      : [];

const obterChavesFavoritos = (dados) =>
  Array.isArray(dados)
    ? dados.map((favorito) =>
        typeof favorito === "object"
          ? getPersonagemKey(favorito)
          : String(favorito),
      )
    : [];

const getFavoritosSalvos = () => {
  const favoritosLocal = normalizarPersonagens(
    lerStorage(window.localStorage, FAVORITOS_KEY, []),
  );
  const chavesFavoritos = obterChavesFavoritos(
    lerStorage(window.sessionStorage, FAVORITOS_KEY, []),
  );

  const chaves = new Set(chavesFavoritos);
  return favoritosLocal.filter((personagem) =>
    chaves.has(getPersonagemKey(personagem)),
  );
};

export default function Personagens() {
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);
  const [favoritos, setFavoritos] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    const personagensFavoritos = getFavoritosSalvos();
    setResultado(personagensFavoritos);
    setFavoritos(
      Object.fromEntries(
        personagensFavoritos.map((personagem) => [
          getPersonagemKey(personagem),
          personagem,
        ]),
      ),
    );
  }, []);

  const buscarPersonagens = async () => {
    setLoading(true);
    setErro("");
    setPersonagemSelecionado(null);
    setPaginaAtual(1);

    try {
      const { data } = await axios.get(
        `https://hp-api.onrender.com/api/characters/`,
      );
      const personagensFavoritos = getFavoritosSalvos();
      setFavoritos(
        Object.fromEntries(
          personagensFavoritos.map((personagem) => [
            getPersonagemKey(personagem),
            personagem,
          ]),
        ),
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
        const favoritosRestantes = Object.values(proximoFavoritos);
        window.localStorage.setItem(
          FAVORITOS_KEY,
          JSON.stringify(favoritosRestantes),
        );
        window.sessionStorage.setItem(
          FAVORITOS_KEY,
          JSON.stringify(Object.keys(proximoFavoritos)),
        );
        setResultado(favoritosRestantes);
        toast.info(`${personagem.name} removido dos favoritos.`);
      } else {
        proximoFavoritos[chave] = personagem;
        const favoritosAtualizados = Object.values(proximoFavoritos);
        window.localStorage.setItem(
          FAVORITOS_KEY,
          JSON.stringify(favoritosAtualizados),
        );
        window.sessionStorage.setItem(
          FAVORITOS_KEY,
          JSON.stringify(Object.keys(proximoFavoritos)),
        );
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
      <button
        type="button"
        className={styles.botaoBuscar}
        onClick={buscarPersonagens}
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      )}
      {erro && <p className={styles.erro}>{erro}</p>}

      {resultado && resultado.length === 0 && (
        <p className={styles.vazio}>Nenhum personagem foi favoritado.</p>
      )}

      {resultado && resultado.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.tituloSecao}>Personagens com imagem</h2>
          <ul className={styles.grid}>
            {personagensPaginaAtual.map((personagem) => (
              <CharacterCard
                key={getPersonagemKey(personagem)}
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
      )}
      {resultado && personagensArquivados.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.tituloSecao}>Personagens arquivados</h2>
          <ul className={styles.listaArquivados}>
            {personagensArquivados.map((personagem) => (
              <CharacterCard
                key={getPersonagemKey(personagem)}
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
