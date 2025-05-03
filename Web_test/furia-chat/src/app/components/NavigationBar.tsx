"use client"

import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

interface NavigationBarProps {
    isMobile: boolean
    onLogout: () => void
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isMobile, onLogout }) => {
    const router = useRouter()
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    const navigationItems = [
        { route: "/dashboard", base: "home", ext: "svg", alt: "Home", label: "Home" },
        { route: "/chat/select", base: "bate_papo", ext: "png", alt: "Chat", label: "Chat" },
        { route: "/ranking", base: "trofeu", ext: "png", alt: "Ranking", label: "Ranking" },
        { route: "/settings", base: "config", ext: "svg", alt: "Config", label: "Configurações" },
    ]

    const getIcon = (base: string, route: string, ext = "png") => {
        if (isActive(route)) return `/icons/${base}_hover.${ext}`
        return `/icons/${base}.${ext}`
    }

    if (isMobile) {
        return null // Não renderizar a barra superior em mobile (a inferior estará visível)
    }

    return (
        <nav className="bg-gray-100 p-4 flex items-center justify-between md:justify-start gap-6 md:gap-8">
            <div className="flex items-center gap-4 md:gap-6">
                {navigationItems.map((item) => (
                    <button
                        key={item.route}
                        onClick={() => item.route.startsWith("/") ? router.push(item.route) : alert("Em breve!")}
                        className={`flex items-center gap-2 ${isActive(item.route) ? "font-semibold text-blue-600" : "text-gray-700 hover:text-blue-500 transition-colors"}`}
                    >
                        <Image src={getIcon(item.base, item.route, item.ext)} alt={item.alt} width={24} height={24} />
                        <span className="hidden md:block">{item.label}</span> {/* Mostrar texto em telas maiores */}
                    </button>
                ))}
            </div>
            <button
                onClick={onLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors font-semibold text-sm md:text-base"
            >
                Logout
            </button>
        </nav>
    )
}

export default NavigationBar