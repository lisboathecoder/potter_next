import Image from "next/image";
import Header from "../components/Header/Header";
import styles from "./page.module.css";

const tecnologias = ["Next.js", "React", "CSS Modules", "JavaScript"];

export default function Home() {
  return (
    <div className={styles.page}>

      <main className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h2>Bem-vindo à PotterNext</h2>
            <p>
              Esta aplicação reúne informações sobre o universo de Harry Potter
              de forma simples, visual e interativa.
            </p>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/images/banner.png"
              width={800}
              height={600}
              alt="Banner do universo Harry Potter"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </section>

        <section className={styles.card}>
          <h3>Sobre o projeto</h3>
          <p>
            A PotterNext é uma aplicação criada para explorar o universo mágico
            com uma interface moderna e conteúdo organizado em páginas.
          </p>
        </section>

        <section className={styles.card}>
          <h3>Tecnologias utilizadas</h3>
          <ul className={styles.list}>
            {tecnologias.map((tec) => (
              <li key={tec}>{tec}</li>
            ))}
          </ul>
        </section>

        <section className={styles.card}>
          <h3>Objetivo da aplicação</h3>
          <p>
            O objetivo é apresentar informações de forma intuitiva, incentivando
            a descoberta do mundo de Harry Potter por meio de uma experiência
            web dinâmica.
          </p>
        </section>
      </main>
    </div>
  );
}
