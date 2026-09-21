import axios from "axios";
import { NextResponse } from "next/server";

const API_URL =
  process.env.API_URL_PERSONAGENS ||
  "https://hp-api.onrender.com/api/characters/";

export async function GET() {
  try {
    const resposta = await axios.get(API_URL);

    return NextResponse.json(resposta.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const dados = error.response?.data || {
      error: "Erro ao buscar os personagens.",
    };

    return NextResponse.json(dados, { status });
  }
}
