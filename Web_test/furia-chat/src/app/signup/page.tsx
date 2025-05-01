"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const handleSignup = async () => {
    setError("")

    if (!name || !email || !password || !confirm) {
      return setError("Por favor, preencha todos os campos.")
    }

    if (password !== confirm) {
      return setError("As senhas não coincidem.")
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: name,
      })
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta.")
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <h1 className="text-3xl font-bold text-center">CRIAR CONTA</h1>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleSignup}
          className="bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Cadastrar
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Já tem uma conta?{" "}
        <span
          onClick={() => router.push("/")}
          className="underline cursor-pointer"
        >
          Faça login
        </span>
      </p>
    </main>
  )
}
