"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signInWithCustomToken, getIdToken } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function DiscordLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    if (!token) {
      router.push("/")
      return
    }

    const login = async () => {
      try {
        await signInWithCustomToken(auth, token)
        const idToken = await getIdToken(auth.currentUser!, true)

        await fetch("/api/session-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        })

        router.push("/dashboard")
      } catch (err) {
        console.error("Erro no login:", err)
        router.push("/")
      }
    }

    login()
  }, [router, searchParams])

  return <p className="text-center mt-10">Entrando com Discord...</p>
}
