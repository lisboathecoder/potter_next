import "./globals.css";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header/Header";

export const metadata = {
  title: "PotterNext",
  description: "Fallback para a Harry Potter Api (hp-api)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
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
