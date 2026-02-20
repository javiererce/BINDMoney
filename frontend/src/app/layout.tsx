import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'BINDMoney | Simulador de Inflación Argentina',
  description: 'Descubre cuántas horas de tu vida cuesta una compra y cómo la inflación erosiona tu poder adquisitivo en Argentina. 100% Gratuito y de la mano de BIND.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} dark`}>
      <body className="font-sans bg-[#0B0F19] text-white antialiased flex flex-col min-h-screen selection:bg-[var(--primary)] selection:text-black">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
