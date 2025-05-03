"use client"

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

	const isActive = (path: string) => pathname === path

	const navigationItems = [
		{ route: "/dashboard", base: "home", ext: "svg", alt: "Home" },
		{ route: "/ranking", base: "trofeu", ext: "png", alt: "Ranking" },
		{ route: "/settings", base: "config", ext: "svg", alt: "Configurações" },
	]

	const getIcon = (base: string, route: string, ext = "png") => {
		if (isActive(route)) return `/icons/${base}_hover.${ext}`
		return `/icons/${base}.${ext}`
	}

	if (isMobile) {
		return null // Não renderizar a sidebar em mobile
	}

	return (
		<aside className="bg-gray-100 w-16 p-4 flex flex-col items-center gap-6 h-full sticky top-0">
			<h2 className="sr-only">FURIA CHAT</h2>{" "}
			{/* Esconde o título visualmente */}
			<nav className="flex flex-col gap-4 w-full items-center">
				{navigationItems.map((item) => (
					<button
						key={item.route}
						onClick={() =>
							item.route.startsWith("/")
								? router.push(item.route)
								: alert("Em breve!")
						}
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
				))}
			</nav>
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
