"use client";
import Link from "next/link";
export default function Header() {
    return (
    <nav>
        <Link href="/">Home</Link>
        <Link href="/personagens">Personagens</Link>
        <Link href="/sobre">Sobre</Link>
    </nav>
    );
}
