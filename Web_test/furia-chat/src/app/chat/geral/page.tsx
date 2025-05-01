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
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface Message {
  id: string;
  name: string;
  text: string;
  timestamp?: any;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isHoveringBack, setIsHoveringBack] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else {
        alert("É necessário fazer o login antes de prosseguir!");
        router.push("/");
      }
    });
    return unsubscribe;
  }, [router]);

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
    const message = input.trim();
    if (!message || !user) return;
    setInput("");
    await addDoc(collection(db, "messages"), {
      name: user.displayName ?? "Anônimo",
      text: message,
      timestamp: serverTimestamp(),
    });
    inputRef.current?.focus();
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const isActive = (path: string) => pathname === path;

  const getIcon = (base: string, route: string, ext = "png") => {
    if (isActive(route) || hovered === base) return `/icons/${base}_hover.${ext}`;
    return `/icons/${base}.${ext}`;
  };

  return (
    <main className="flex flex-col h-screen">
      {/* Header com botão de voltar */}
      <header className="bg-black text-white py-4 font-bold text-lg flex items-center px-4 gap-4">
        <button
          onClick={handleBackToDashboard}
          onMouseEnter={() => setIsHoveringBack(true)}
          onMouseLeave={() => setIsHoveringBack(false)}
          className="relative w-8 h-8"
        >
          <Image
            src={isHoveringBack ? "/icons/voltar_hover.png" : "/icons/voltar.png"}
            alt="Voltar"
            fill
            className="object-contain"
          />
        </button>
        <span className="text-center flex-1 mr-8">FURIA x NAVI - Chat Room</span>
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
      <footer className="bg-white border-t pt-3">
        <div className="flex items-center gap-2 px-3 pb-3">
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
        </div>

        {/* Barra de navegação inferior */}
        { /*<nav className="border-t border-gray-200 pt-2 pb-3 flex justify-around bg-white">
          {[
            { route: "/dashboard", base: "home", ext: "svg", alt: "Home" },
            { route: "/chat", base: "bate_papo", ext: "png", alt: "Chat" },
            { route: "/ranking", base: "trofeu", ext: "png", alt: "Ranking" },
            { route: "/settings", base: "config", ext: "svg", alt: "Config" },
          ].map(({ route, base, ext, alt }) => (
            <button
              key={route}
              onClick={() =>
                route.startsWith("/") ? router.push(route) : alert("Coming soon")
              }
              onMouseEnter={() => setHovered(base)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={getIcon(base, route, ext)}
                alt={alt}
                width={28}
                height={28}
              />
            </button>
          ))}
        </nav> */}
      </footer>
    </main>
  );
}
