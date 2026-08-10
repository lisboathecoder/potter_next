import Link from "next/link";
import Image from "next/image";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>
                404 - Página Não Encontrada
            </h1>
            <p className={styles.texto}>
                Ops! O conteúdo que você está procurando não existe ou foi movido.
            </p>
            <Link href="/" className={styles.botaoVoltar}>
                Voltar para a Home
            </Link>
            <Image
                src="/images/image.png"
                fill
                alt="Imagem de fundo da página 404"
                className={styles.imagemFundo}
                priority
            />
        </div>
    );
}