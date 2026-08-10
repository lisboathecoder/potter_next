"use client";

import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function Page() {
    const showSuccess = () => toast.success("Sucesso!");

    const showError = () => toast.error("Erro!");

    const showPromise = () => {
        const promise = new Promise((resolve, reject) =>
            setTimeout(() => (Math.random() > 0.5 ? resolve() : reject()), 2000)
        );

        toast.promise(promise, {
            loading: "Carregando...",
            success: "Concluído!",
            error: "Falhou!",
        });
    };
    
    return (
        <div className={styles.container}>
            <button onClick={showSuccess}>Mostrar Sucesso</button>
            <button onClick={showError}>Mostrar Erro</button>
            <button onClick={showPromise}>Mostrar Promise</button>
        </div>
    )
}