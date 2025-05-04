"use client"

import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function LiveStatusDisplay() {
  const [status, setStatus] = useState<string | null>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)

  useEffect(() => {
    const docRef = doc(db, "liveStatus", "match1")
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setStatus(data.status || null)
        setStreamUrl(data.streamUrl || null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-gray-200">
      <h2 className="text-2xl font-bold text-black">Status da Partida</h2>
      
      {/* Linha estilizada: amarela com contorno preto */}
      <div className="h-2 bg-yellow-500 border-2 border-black rounded-sm" />

      <p className="text-lg text-gray-700">
        {status || "Carregando status da partida..."}
      </p>

      {streamUrl ? (
        <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-300">
          <iframe
            src={streamUrl}
            title="Transmissão ao vivo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <p className="text-sm text-gray-500">Transmissão ao vivo indisponível.</p>
      )}
    </div>
  )
}
