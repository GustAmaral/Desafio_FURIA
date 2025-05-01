"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DashboardPage() {
	const router = useRouter();
	const pathname = usePathname();
	const [user, setUser] = useState<User | null>(null);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	// Estados de hover para os ícones
	const [hovered, setHovered] = useState<string | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				if (!isLoggingOut) {
					alert("É necessário fazer o login antes de prosseguir!");
				}
				router.push("/");
			}
		});
		return unsubscribe;
	}, [router, isLoggingOut]);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		await signOut(auth);
		router.push("/");
	};

	// Função auxiliar para aplicar estilo ativo
	const isActive = (path: string) => pathname === path;

	// Função para decidir qual ícone usar (ativo, hover ou normal)
	const getIcon = (base: string, route: string, ext = "png") => {
		if (isActive(route) || hovered === base) return `/icons/${base}_hover.${ext}`;
		return `/icons/${base}.${ext}`;
	};

	return (
		<main className="p-6 flex flex-col gap-4 items-center pb-20">
			<h2 className="text-xl font-semibold mb-2">FURIA x NAVI</h2>
			<p className="text-sm text-gray-500">18:00 - Latest news headline...</p>

			<div className="mt-6 flex flex-col gap-4 w-full max-w-sm">
				<button
					className="bg-[#c9b58c] border border-black text-black py-3 rounded-lg font-bold hover:bg-yellow-600 transition"
					onClick={() => router.push("/chat/select")}
				>
					ENTER CHAT ROOM
				</button>
				<button className="bg-gray-200 border border-black text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
					VIEW PREDICTIONS GAME
				</button>
				<button className="bg-gray-200 border border-black text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
					WATCH PARTY
				</button>
				<button className="bg-gray-200 border border-black text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
					LEADERBOARD
				</button>
				<button
					onClick={handleLogout}
					className="bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
				>
					LOGOUT
				</button>
			</div>

			<nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-3 flex justify-around">
				{[
					{ route: "/dashboard", base: "home", ext: "svg", alt: "Home" },
					{ route: "/chat", base: "bate_papo", ext: "png", alt: "Chat" },
					{ route: "/ranking", base: "trofeu", ext: "png", alt: "Ranking" },
					{ route: "/settings", base: "config", ext: "svg", alt: "Config" },
				].map(({ route, base, ext, alt }) => (
					<button
						key={route}
						onClick={() => route.startsWith("/") ? router.push(route) : alert("Coming soon")}
						onMouseEnter={() => setHovered(base)}
						onMouseLeave={() => setHovered(null)}
					>
						<Image
							src={getIcon(base, route, ext)}
							alt={alt}
							width={28}
							height={28}
						/>
					</button>
				))}
			</nav>
		</main>
	);
}
