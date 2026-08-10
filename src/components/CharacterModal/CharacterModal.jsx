import Image from "next/image";
import styles from "./CharacterModal.module.css";

export default function CharacterModal({ personagem, onClose }) {
	const valorOuNaoInformado = (valor) => valor || "Não informado";

	return (
		<div className={styles.overlay} role="presentation" onClick={onClose}>
			<div
				className={styles.modal}
				role="dialog"
				aria-modal="true"
				aria-labelledby="detalhes-personagem"
			>
				<button type="button" className={styles.close} onClick={onClose} aria-label="Fechar modal">
					&times;
				</button>
				<h2 id="detalhes-personagem" className={styles.title}>
					{personagem.name}
				</h2>
				<div className={styles.content}>
					{personagem.image && (
						<Image
							src={personagem.image}
							alt={personagem.name}
							width={240}
							height={320}
							sizes="240px"
							className={styles.image}
							quality={100}
						/>
					)}
					<div className={styles.details}>
						<p>Casa: {valorOuNaoInformado(personagem.house)}</p>
						<p>Espécie: {valorOuNaoInformado(personagem.species)}</p>
						<p>Gênero: {valorOuNaoInformado(personagem.gender)}</p>
						<p>Data de Nascimento: {valorOuNaoInformado(personagem.dateOfBirth)}</p>
						<p>Patrono: {valorOuNaoInformado(personagem.patronus)}</p>
						<p>Ator: {valorOuNaoInformado(personagem.actor)}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
