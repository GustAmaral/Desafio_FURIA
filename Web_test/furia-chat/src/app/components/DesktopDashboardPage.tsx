"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import SidebarNavigation from "@/app/components/SidebarNavigation"
import LiveStatusDisplay from "@/app/components/LiveStatus"

interface DesktopDashboardPageProps {
	isMobile: boolean
	onLogout: () => void
}

const DesktopDashboardPage: React.FC<DesktopDashboardPageProps> = ({
	isMobile,
	onLogout,
}) => {
	const router = useRouter()
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false)
	const chatOptions = [
		{ id: "geral", label: "#geral" },
		{ id: "pre-jogo", label: "#pré-jogo" },
		{ id: "pos-jogo", label: "#pós-jogo" },
		{ id: "clipes-e-memes", label: "#clipes-e-memes" },
	]

	const toggleChatSidebar = () => {
		setIsChatSidebarOpen(!isChatSidebarOpen)
	}

	return (
		<div className="flex h-screen bg-gray-50">
			<SidebarNavigation isMobile={isMobile} onLogout={onLogout} />

			<main className="flex-1 p-6 md:p-8 flex md:flex-row gap-6">
				<div className="flex flex-col gap-4 mr-8 md:w-1/5 max-w-sm">
					<h2 className="text-xl font-semibold mb-2 md:text-2xl">
						FURIA x NAVI
					</h2>
					<p className="text-sm text-gray-500 md:text-base mb-4">
						18:00 - Últimas noticias sobre...
					</p>
					<button
						className="bg-gray-200 border border-black text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition md:py-4 md:text-lg"
						onClick={toggleChatSidebar}
					>
						CHAT ROOM
					</button>
					<button
						className="bg-gray-200 border border-black text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
						onClick={() => {
							alert("Em breve!")
						}}
					>
						APOSTAS
					</button>
					<button
						className="bg-gray-200 border border-black text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
						onClick={() => router.push("/watch-party")}
					>
						WATCH PARTY
					</button>
					<button
						className="bg-gray-200 border border-black text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
						onClick={() => router.push("/leaderboard")}
					>
						TABELA DE CLASSIFICAÇÃO
					</button>
				</div>

				{/* Chat Sidebar */}
				{isChatSidebarOpen && (
					<aside className="w-64 border-l border-gray-200 p-6 flex flex-col gap-4">
						<div>
							<h2 className="text-lg font-semibold mb-4">Opções de Chat</h2>
							<div className="flex flex-col gap-3">
								{chatOptions.map((chat) => (
									<button
										key={chat.id}
										onClick={() => router.push(`/chat/${chat.id}`)}
										className="bg-gray-200 hover:bg-yellow-500 border border-black rounded-lg py-3 text-black font-semibold w-full"
									>
										{chat.label}
									</button>
								))}
							</div>
							<button
								onClick={toggleChatSidebar}
								className="mt-6 flex items-center gap-2 text-black font-semibold hover:underline"
							>
								<Image
									src="/icons/voltar_p.png"
									alt="Voltar"
									width={20}
									height={20}
								/>
								Fechar Chat
							</button>
						</div>
					</aside>
				)}

				<div className="flex-1 overflow-y-auto">
					{/* Live status de partidas */}
					<LiveStatusDisplay />
				</div>
			</main>
		</div>
	)
}

export default DesktopDashboardPage
