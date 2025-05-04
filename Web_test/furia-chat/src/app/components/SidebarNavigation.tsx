"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

interface SidebarNavigationProps {
	isMobile: boolean
	onLogout: () => void
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
	onLogout,
	isMobile,
}) => {
	const router = useRouter()
	const pathname = usePathname()
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const isActive = (path: string) => pathname === path

	const navigationItems = [
		{ route: "/dashboard", base: "home", ext: "svg", alt: "Home" },
		{ route: "ranking", base: "trofeu", ext: "png", alt: "Ranking" },
		{ route: "/settings", base: "config", ext: "svg", alt: "Configurações" },
	]

	const getIcon = (base: string, route: string, ext = "png") => {
		if (isActive(route)) return `/icons/${base}_hover.${ext}`
		return `/icons/${base}.${ext}`
	}

	const settingsOptions = [
		"Editar Perfil",
		"Dados e Privacidade",
		"Clipes Salvos",
		"Aparência",
	]

	if (isMobile) return null

	return (
		<aside className="bg-gray-100 w-16 p-4 flex flex-col items-center gap-6 h-full sticky top-0 relative">
			<h2 className="sr-only">FURIA CHAT</h2>
			<nav className="flex flex-col gap-4 w-full items-center relative">
				{navigationItems.map((item) => (
					<div key={item.route} className="relative">
						<button
							onClick={() => {
								if (item.route === "/settings") {
									setIsSettingsOpen((prev) => !prev)
								} else if (!item.route.startsWith("/")) {
									alert("Em breve!")
								} else {
									router.push(item.route)
								}
							}}
							className={`w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors ${
								isActive(item.route) ? "bg-gray-200" : "text-gray-700"
							}`}
						>
							<Image
								src={getIcon(item.base, item.route, item.ext)}
								alt={item.alt}
								width={24}
								height={24}
							/>
						</button>

						{/* Menu flutuante de configurações */}
						{item.route === "/settings" && isSettingsOpen && (
							<div className="absolute left-14 top-0 bg-white shadow-lg border border-gray-200 rounded-md py-2 w-48 z-10">
								{settingsOptions.map((option, index) => (
									<button
										key={index}
										onClick={() => alert("Em breve!")}
										className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
									>
										{option}
									</button>
								))}
							</div>
						)}
					</div>
				))}
			</nav>

			{/* Botão de logout */}
			<button
				onClick={onLogout}
				className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-red-100 transition-colors text-red-500"
			>
				<Image src="/icons/sair.png" alt="Logout" width={24} height={24} />
			</button>
		</aside>
	)
}

export default SidebarNavigation
