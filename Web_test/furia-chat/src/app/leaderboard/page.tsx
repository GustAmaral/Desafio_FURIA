"use client"

import { Card } from "@/app/components/Card"
import { BadgeCheck, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const matches = [
  {
    date: "10:25 • SÁBADO, 22 DE MARÇO DE 2025",
    team1: "MIBR",
    team2: "FURIA",
    score1: 2,
    score2: 1,
    event: "BLAST Open Lisbon 2025",
  },
  {
    date: "12:35 • DOMINGO, 23 DE MARÇO DE 2025",
    team1: "FURIA",
    team2: "Apogee",
    score1: 2,
    score2: 0,
    event: "PGL Bucharest 2025",
  },
  {
    date: "15:10 • TERÇA, 25 DE MARÇO DE 2025",
    team1: "FURIA",
    team2: "Astralis",
    score1: 1,
    score2: 2,
    event: "IEM Katowice 2025"
  },
  {
    date: "18:45 • QUARTA, 26 DE MARÇO DE 2025",
    team1: "G2 Esports",
    team2: "FURIA",
    score1: 0,
    score2: 2,
    event: "ESL Pro League Season 21"
  },
  {
    date: "11:00 • SEXTA, 28 DE MARÇO DE 2025",
    team1: "FURIA",
    team2: "Team Liquid",
    score1: 2,
    score2: 1,
    event: "BLAST Premier Spring Groups 2025"
  },
  {
    date: "14:20 • SÁBADO, 29 DE MARÇO DE 2025",
    team1: "Natus Vincere",
    team2: "FURIA",
    score1: 2,
    score2: 0,
    event: "BLAST Premier Spring Final 2025"
  },
  {
    date: "17:55 • DOMINGO, 30 DE MARÇO DE 2025",
    team1: "FURIA",
    team2: "Heroic",
    score1: 1,
    score2: 2,
    event: "IEM Dallas 2025"
  },
  {
    date: "13:05 • SEGUNDA, 31 DE MARÇO DE 2025",
    team1: "Complexity",
    team2: "FURIA",
    score1: 0,
    score2: 2,
    event: "ESL Challenger League Season 47 North America"
  },
  {
    date: "16:30 • TERÇA, 1 DE ABRIL DE 2025",
    team1: "FURIA",
    team2: "FaZe Clan",
    score1: 2,
    score2: 1,
    event: "BLAST.tv Paris Major 2025: American RMR"
  },
  {
    date: "19:00 • QUARTA, 2 DE ABRIL DE 2025",
    team1: "9z Team",
    team2: "FURIA",
    score1: 0,
    score2: 2,
    event: "BLAST.tv Paris Major 2025: American RMR"
  }
]

export default function MatchesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen text-black relative px-4 py-6">
      {/* Botão de voltar com ícone */}
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-4 left-4 w-10 h-10"
      >
        <Image
          src="/icons/voltar_p.png"
          alt="Voltar"
          width={32}
          height={32}
          className="object-contain"
        />
      </button>

      <h1 className="text-center text-2xl font-bold mb-6">Resultados</h1>

      {/* Cards centralizados */}
      <div className="flex flex-col items-center gap-6">
        {matches.map((match, i) => (
          <Card key={i} className="w-full max-w-xl p-4 border-l-4 border-green-500">
            <div className="text-sm text-neutral-400 flex items-center gap-2 mb-2">
              <Calendar size={14} />
              {match.date}
            </div>

            <div className="flex justify-between text-lg font-semibold mb-1">
              <span>{match.team1}</span>
              <span>{match.score1}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>{match.team2}</span>
              <span>{match.score2}</span>
            </div>

            <div className="text-green-500 text-xs mt-2 flex items-center gap-1">
              <BadgeCheck size={14} />
              {match.event}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
