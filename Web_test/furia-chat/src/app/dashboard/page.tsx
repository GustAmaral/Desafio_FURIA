"use client";

import { useRouter } from "next/navigation";
import { FaHome, FaComments, FaTrophy, FaCog } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="p-6 flex flex-col gap-4 items-center pb-20">
      {/* Título do jogo */}
      <h2 className="text-xl font-semibold mb-2">FURIA x NAVI</h2>
      <p className="text-sm text-gray-500">18:00 - Latest news headline...</p>

      {/* Botões principais */}
      <div className="mt-6 flex flex-col gap-4 w-full max-w-sm">
        <button
          className="bg-yellow-500 text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition"
          onClick={() => router.push("/chat")}
        >
          ENTER CHAT ROOM
        </button>
        <button className="bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
          VIEW PREDICTIONS GAME
        </button>
        <button className="bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
          WATCH PARTY
        </button>
        <button className="bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
          LEADERBOARD
        </button>
      </div>

      {/* Rodapé com botões e ícones */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 flex justify-around">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <FaHome size={20} />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => router.push("/chat")}
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <FaComments size={20} />
          <span className="text-xs">Chat</span>
        </button>
        <button
          onClick={() => alert('Coming soon')}
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <FaTrophy size={20} />
          <span className="text-xs">Ranking</span>
        </button>
        <button
          onClick={() => alert('Settings')}
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <FaCog size={20} />
          <span className="text-xs">Config</span>
        </button>
      </nav>
    </main>
  );
}
