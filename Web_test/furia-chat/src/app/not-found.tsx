import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-center font-bold">Página 404 - Não encontrada</h1>
			<p>Essa página que tentou acessar não existe</p>
			<button className="border-2 p-1 bg-cyan-300">
				<Link href="/">Voltar para home</Link>
			</button>
		</div>
	);
}
