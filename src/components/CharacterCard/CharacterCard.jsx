import Image from "next/image";
import styles from "./CharacterCard.module.css";

export default function CharacterCard({ personagem, onClick }) {
	const temImagem = Boolean(personagem.image);

	return (
		<li className={styles.card}>
			<button
				type="button"
				className={temImagem ? styles.imageButton : styles.archiveButton}
				onClick={() => onClick(personagem)}
				aria-label={`Ver detalhes de ${personagem.name}`}
			>
				{temImagem ? (
					<>
						<Image
							src={personagem.image}
							alt={personagem.name}
							width={240}
							height={320}
							sizes="(max-width: 768px) 45vw, 240px"
							className={styles.image}
						/>
						<h3 className={styles.name}>{personagem.name}</h3>
					</>
				) : (
					<>
						<strong className={styles.archiveName}>{personagem.name}</strong>
						<span className={styles.archiveLabel}>Sem imagem disponível</span>
					</>
				)}
			</button>
		</li>
	);
}
