import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "Orthopride tools",
	description:
		"Ferramenta exclusiva para funcionários da Orthopride. Criada por Caio Alves",
	authors: {name: "Caio Alves"},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={inter.className}>
				<main className="container text-center mt-4">
					{children}
					<Toaster />
				</main>
			</body>
		</html>
	);
}
