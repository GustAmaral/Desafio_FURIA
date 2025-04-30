// /app/chat/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Message {
  id: string;
  name: string;
  text: string;
  timestamp?: any;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[]
      );
    });
    return unsubscribe;
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput("");
    await addDoc(collection(db, "messages"), {
      name: "Você",
      text: input,
      timestamp: serverTimestamp(),
    });
    inputRef.current?.focus();
  };

  return (
    <main className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-black text-white text-center py-4 font-bold text-lg">
        FURIA x NAVI - Chat Room
      </header>

      {/* Mensagens */}
      <section className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100 text-black">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
            <p className="text-sm font-semibold text-black">{msg.name}</p>
            <p className="text-black">{msg.text}</p>
          </div>
        ))}
      </section>

      {/* Input de mensagem */}
      <footer className="p-3 bg-white border-t flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Digite sua mensagem..."
          className="flex-1 border rounded-full px-4 py-2 text-sm text-black"
        />
        <button
          onClick={handleSend}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-semibold"
        >
          Enviar
        </button>
      </footer>
    </main>
  );
}
