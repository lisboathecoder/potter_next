import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Image
          className={styles.logo}
          src="/images/logo-potter-next.svg"
          alt="PotterNext"
          width={100}
          height={100}
          priority
          quality={100}
        />
        <span className={styles.brandText}>PotterNext</span>
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
      </nav>
    </header>
  );
}
