"use client";

import { useEffect, useState, useRef } from "react";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    doc, // Importe doc
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

const CHAT_GERAL_ID = "chat_pre_jogo";

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [isHoveringBack, setIsHoveringBack] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const bottomRef = useRef<HTMLDivElement>(null);

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
        // Referência à subcoleção de mensagens dentro do documento do chat geral
        const messagesRef = collection(db, "chats", CHAT_GERAL_ID, "messages");
        const q = query(messagesRef, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Message[]
            );
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        });
        return unsubscribe;
    }, []);

    const handleSend = async () => {
        const message = input.trim();
        if (!message || !user) return;
        setInput("");

        // Referência à subcoleção de mensagens para adicionar o documento
        const messagesRef = collection(db, "chats", CHAT_GERAL_ID, "messages");
        await addDoc(messagesRef, {
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
        if (isActive(route) || hovered === base)
            return `/icons/${base}_hover.${ext}`;
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
                        src={
                            isHoveringBack ? "/icons/voltar_hover.png" : "/icons/voltar.png"
                        }
                        alt="Voltar"
                        fill
                        className="object-contain"
                    />
                </button>
                <span className="text-center flex-1 mr-8">#pré-jogo</span>
            </header>

            {/* Mensagens */}
            <section className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100 text-black">
                {messages.map((msg) => {
                    const isCurrentUser = msg.name === user?.displayName;
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${
                                isCurrentUser ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`p-3 rounded-lg shadow-sm max-w-xs ${
                                    isCurrentUser
                                        ? "bg-yellow-100 text-right"
                                        : "bg-white text-left"
                                }`}
                            >
                                <p className="text-sm font-semibold text-black">{msg.name}</p>
                                <p className="text-black">{msg.text}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
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
            </footer>
        </main>
    );
}
