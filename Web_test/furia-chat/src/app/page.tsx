"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { auth, provider } from "@/lib/firebase"
import { signInWithPopup, onAuthStateChanged } from "firebase/auth"

export default function Home() {
    const router = useRouter()
    const [emailRegistered, setEmailRegistered] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const registered = params.get("email_registered") === "true";
        setEmailRegistered(registered);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) router.push("/dashboard")
        })
        return unsubscribe
    }, [router])

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider)
        } catch (error) {
            console.error("Erro ao fazer login com Google:", error)
        }
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
            {/* TÍTULO */}
            <h1 className="text-4xl font-bold text-center">FAN CHAT</h1>

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

            {emailRegistered && (
                <p className="text-yellow-500 font-semibold">
                    O e-mail da sua conta Discord já está registrado. Faça login com sua conta existente.
                </p>
            )}
            {/* BOTÕES DE LOGIN */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 bg-neutral-300 text-black py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                    <Image
                        src="/icons/google-logo.svg"
                        alt="Google"
                        width={20}
                        height={20}
                    />
                    Fazer login com Google
                </button>

                <button
                    onClick={() => router.push("/login/email")}
                    className="border border-neutral-900 flex items-center justify-center gap-3 py-2 px-4 rounded-lg font-semibold hover:bg-black hover:text-white transition"
                >
                    Fazer login com E-mail
                </button>
            </div>

            {/* LINK DE CADASTRO */}
            <p className="text-sm text-gray-500">
                Não tem conta?{" "}
                <span
                    className="underline cursor-pointer"
                    onClick={() => router.push("/signup")}
                >
                    Cadastre-se
                </span>
            </p>
        </main>
    )
}