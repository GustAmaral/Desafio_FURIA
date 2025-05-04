"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import LiveStatusDisplay from "@/app/components/LiveStatus";

interface MobileDashboardPageProps {
	onLogout: () => void;
	toggleSettingsMenu: () => void;
	isSettingsOpen: boolean;
	isActive: (route: string) => boolean;
}

const MobileDashboardPage: React.FC<MobileDashboardPageProps> = ({
	onLogout,
	toggleSettingsMenu,
	isSettingsOpen,
	isActive,
}) => {
	const router = useRouter();

	return (
		<div className="flex flex-col h-screen bg-gray-50 items-center p-6">
			{" "}
			{/* Layout flex column e centralizado */}
			<h2 className="text-xl font-semibold mb-2 md:text-2xl text-center">
				FURIA x NAVI
			</h2>
			<p className="text-sm text-gray-500 md:text-base mb-4 text-center">
				18:00 - Latest news headline...
			</p>
			<LiveStatusDisplay /> {/* Live status */}
			<div className="flex flex-col gap-4 w-full max-w-sm mt-5">
				{" "}
				{/* Container para os botões */}
				<button className="bg-gray-200 border border-black text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition w-full flex justify-center">
					APOSTAS
				</button>
				<button
					className="bg-gray-200 border border-black text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition w-full flex justify-center"
					onClick={() => router.push("/watch-party")}
				>
					WATCH PARTY
				</button>
				<button className="bg-gray-200 border border-black text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition w-full flex justify-center">
					TABELA DE CLASSIFICAÇÃO
				</button>
			</div>
			<nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-3 flex justify-around items-center">
				{[
					{ route: "/dashboard", base: "home", ext: "svg", alt: "Home" },
					{
						route: "/chat/select",
						base: "bate_papo",
						ext: "png",
						alt: "Chat",
					},
					{ route: "/ranking", base: "trofeu", ext: "png", alt: "Ranking" },
					{ base: "config", ext: "svg", alt: "Config" },
				].map(({ route, base, ext, alt }) => (
					<div key={base} className="relative">
						<button
							onClick={() => {
								if (route?.startsWith("/")) {
									router.push(route);
								} else if (base === "config") {
									toggleSettingsMenu();
								} else {
									alert("Coming soon");
								}
							}}
						>
							<Image
								src={`/icons/${base}${
									isActive(route || "") ? "_hover" : ""
								}.${ext}`}
								alt={alt}
								width={28}
								height={28}
							/>
						</button>
						{base === "config" && isSettingsOpen && (
							<div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden z-10 mt-2">
								<button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100">
									Editar Perfil
								</button>
								<button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100">
									Dados e Privacidade
								</button>
								<button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100">
									Clipes Salvos
								</button>
								<button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100">
									Aparência
								</button>
								<button
									onClick={onLogout}
									className="block w-full text-left py-2 px-4 text-red-600 hover:bg-red-100"
								>
									Logout
								</button>
							</div>
						)}
					</div>
				))}
			</nav>
		</div>
	);
};

export default MobileDashboardPage;
