<<<<<<< HEAD
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [tema, setTema] = useState("light");

  useEffect(() => {
    setTema(document.documentElement.dataset.theme || "light");
  }, []);

  const alternarTema = () => {
    const novoTema = tema === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = novoTema;
    // biome-ignore lint/suspicious/noDocumentCookie: cookie stores the theme preference
    document.cookie = `tema=${novoTema}; max-age=2592000; path=/; samesite=lax`;
    setTema(novoTema);
  };

=======
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
>>>>>>> 7a466193567b072a8f912ec3b44324d5252603c9
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link href="/">
<<<<<<< HEAD
          <Image
            className={styles.logo}
            src="/images/logo-potter-next.svg"
            alt="PotterNext"
            width={120}
            height={120}
            priority
            quality={75}
          />
        </Link>
        <span className={styles.brandText}>PotterNext</span>
=======
        <Image
          className={styles.logo}
          src="/images/logo-potter-next.svg"
          alt="PotterNext"
          width={120}
          height={120}
          priority
          quality={100}
        />
        </Link>
        <span className={styles.brandText}>PotterNext</span>

>>>>>>> 7a466193567b072a8f912ec3b44324d5252603c9
      </div>

      <nav className={styles.nav} aria-label="Navegação principal">
        <Link className={styles.link} href="/">
          Home
        </Link>
        <Link className={styles.link} href="/personagens">
          Personagens
        </Link>
        <Link className={styles.link} href="/sobre">
          Sobre
        </Link>
<<<<<<< HEAD
        <button
          type="button"
          className={styles.themeButton}
          onClick={alternarTema}
          aria-label={`Ativar modo ${tema === "light" ? "escuro" : "claro"}`}
        >
          {tema === "light" ? "🌙 Escuro" : "☀️ Claro"}
        </button>
=======
>>>>>>> 7a466193567b072a8f912ec3b44324d5252603c9
      </nav>
    </header>
  );
}
