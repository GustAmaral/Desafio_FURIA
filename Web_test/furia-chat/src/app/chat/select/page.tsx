"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function ChatSelection() {
	const router = useRouter()
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768)
		checkMobile()
		window.addEventListener("resize", checkMobile)
		return () => window.removeEventListener("resize", checkMobile)
	}, [])

	const chatOptions = [
		{ id: "geral", label: "#geral" },
		{ id: "pre-jogo", label: "#pré-jogo" },
		{ id: "pos-jogo", label: "#pós-jogo" },
		{ id: "clipes-e-memes", label: "#clipes-e-memes" },
	]

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full z-50 transition-transform duration-300 ease-in-out ${
				isMobile ? "translate-x-0" : "flex justify-center items-start pt-32"
			}`}
		>
			<div
				className={`${
					isMobile
						? "w-full h-full px-6 pt-10"
						: "border rounded-lg shadow-lg p-6"
				}`}
			>
				<h2 className="text-xl font-bold mb-4">Escolha um chat</h2>
				<div className="flex flex-col gap-3">
					{chatOptions.map((chat) => (
						<button
							key={chat.id}
							onClick={() => router.push(`/chat/${chat.id}`)}
							className="bg-gray-200 hover:bg-gray-300 border border-black rounded-lg py-3 text-black font-semibold w-full"
						>
							{chat.label}
						</button>
					))}
				</div>
				<button
					onClick={() => router.back()}
					className="mt-6 flex items-center gap-2 text-black font-semibold hover:underline"
				>
					<Image
						src="/icons/voltar_p.png"
						alt="Voltar"
						width={20}
						height={20}
					/>
					Voltar
				</button>
			</div>
		</div>
	)
}