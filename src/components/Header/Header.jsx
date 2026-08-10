import styles from "./Header.module.css";
import Image from "next/image";

export default function Header({ title, subtitle }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Image
          src="/images/logo-potter-next.svg"
          alt="Minha logo"
          loading="eager"
          width={500}
          height={500}
          style={{
            width: '20%',
            height: 'auto'
          }}
        />
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </header>
  );
}