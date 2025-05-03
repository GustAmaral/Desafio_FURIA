"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signInWithCustomToken } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function DiscordLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    if (!token) {
      // Redireciona apenas no cliente
      router.push("/")
      return
    }

    const login = async () => {
      try {
        await signInWithCustomToken(auth, token)
        router.push("/dashboard")
      } catch (err) {
        console.error("Erro ao fazer login com token:", err)
        router.push("/")
      }
    }

    login()
  }, [router, searchParams])

  // Renderiza algo que não depende de searchParams inicialmente
  return <p className="text-center mt-10">Processando login com Discord...</p>
}