import "./globals.css";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import { cookies } from "next/headers";
=======
>>>>>>> 7a466193567b072a8f912ec3b44324d5252603c9
import { ToastContainer } from "react-toastify";
import Header from "../components/Header/Header";

export const metadata = {
  title: "PotterNext",
  description: "Fallback para a Harry Potter Api (hp-api)",
};

<<<<<<< HEAD
export default async function RootLayout({ children }) {
  const temaCookie = (await cookies()).get("tema")?.value;
  const tema = temaCookie === "dark" ? "dark" : "light";

  return (
    <html lang="pt-BR" data-theme={tema} suppressHydrationWarning>
=======
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
>>>>>>> 7a466193567b072a8f912ec3b44324d5252603c9
      <body>
        <Header />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
