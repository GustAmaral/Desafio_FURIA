"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center p-6 bg-white">
      <Image
        src="/icons/error_404.png"
        alt="404"
        width={100}
        height={100}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold text-black mb-2">Página não encontrada</h1>
      <p className="text-gray-600 mb-6">A página que você está tentando acessar não existe ou foi movida.</p>
      <button
        onClick={() => router.push("/dashboard")}
        className="bg-[#c9b58c] border border-black text-black py-3 px-6 rounded-lg font-bold hover:bg-yellow-600 transition"
      >
        Voltar ao início
      </button>
    </main>
  )
}
