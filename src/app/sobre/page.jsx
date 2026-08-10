import Header from "../../components/Header/Header";
import styles from "./sobre.module.css";

export default function Sobre() {
  return (
    <div className={styles.page}>
      <Header title="Sobre o projeto" subtitle="Informações do grupo e do curso" />

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
          <ul className={styles.list}>
            <li>Fabio Henrique R. Trevizolli</li>
            <li>Gustavo T. Lisboa</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
