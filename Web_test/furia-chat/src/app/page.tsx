"use client";

import React from "react";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center h-screen gap-6 p-4">
			{/* TÍTULO */}
			<h1 className="text-4xl font-bold text-center">FURIA</h1>
			<h2 className="text-2xl font-bold text-center">FAN CHAT</h2>

			{/* LOGO */}
			<div className="w-42 h-42 relative">
				<Image
					src="/logo-furia.png"
					alt="Furia logo"
					fill
					className="object-contain"
				/>
			</div>

			<h1 className="text-3xl font-bold text-center">LOGIN</h1>

			{/* BOTÕES DE LOGIN */}
			<div className="flex flex-col gap-3 w-full max-w-xs">
				<button className="flex items-center justify-center gap-3 bg-white text-black py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition">
					<Image
						src="/icons/google-logo.svg"
						alt="Google"
						width={20}
						height={20}
					/>
					Sign in with Google
				</button>

				<button className="flex items-center justify-center gap-3 bg-[#5865F2] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#4752c4] transition">
					<Image
						src="/icons/logo-discord.svg"
						alt="Discord"
						width={20}
						height={20}
					/>
					Sign in with Discord
				</button>

				<button className="border border-white flex items-center justify-center gap-3 py-2 px-4 rounded-lg font-semibold hover:bg-black hover:text-white transition">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M16 12H8m0 0l4-4m-4 4l4 4"
						/>
					</svg>
					SIGN IN WITH EMAIL
				</button>
			</div>

			{/* LINK DE CADASTRO */}
			<p className="text-sm text-gray-500">
				Don't have an account?{" "}
				<span className="underline cursor-pointer">SIGN UP</span>
			</p>
		</main>
	);
}
