import Image from "next/image";
import Header from "../../components/Header/Header";
import styles from "./sobre.module.css";

const integrantes = [
  {
    nome: "Fabio Henrique R. Trevizolli",
    foto: "/images/Fabio_bruxo.png",
  },
  {
    nome: "Gustavo T. Lisboa",
    foto: "/images/Lisboa-bruxo.png",
  },
];

export default function Sobre() {
  return (
    <div className={styles.page}>

      <main className={styles.container}>
        <section className={styles.card}>
          <h2>Informações gerais</h2>
          <ul className={styles.list}>
            <li>
              <strong>Turma:</strong> 2TDS1
            </li>
            <li>
              <strong>Curso:</strong> Técnico em Desenvolvimento de Sistemas
            </li>
            <li>
              <strong>Professores:</strong> Thiago e Marcelo
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>Integrantes do grupo</h2>
          <div className={styles.integrantes}>
            {integrantes.map((integrante) => (
              <article key={integrante.nome} className={styles.integrante}>
                <Image
                  src={integrante.foto}
                  width={800}
                  height={600}
                  alt={integrante.nome}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  className={styles.foto}
                />
                <p>{integrante.nome}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
