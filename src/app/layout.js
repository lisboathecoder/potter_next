import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: 'FrontEnd - Codeverse',
    description: 'Template do Codeverse',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
