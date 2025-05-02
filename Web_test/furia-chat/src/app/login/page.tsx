"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function EmailLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/dashboard")
    })
    return unsubscribe
  }, [router])

  const handleLogin = async () => {
    setError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      setError("Email ou senha inválidos.")
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <h1 className="text-4xl font-bold text-center">FAN CHAT</h1>

      <div className="w-42 h-42 relative">
        <Image
          src="/logo-furia.png"
          alt="Furia logo"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleLogin}
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          Entrar
        </button>
        <button
          onClick={() => router.push("/")}
          className="text-sm text-gray-500 underline cursor-pointer"
        >
          Voltar para login principal
        </button>
      </div>
    </main>
  )
}
