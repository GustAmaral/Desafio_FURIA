// app/watch-party/page.tsx
"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const LivePlayer = dynamic(() => import("@/app/components/LivePlayer"), { ssr: false })
const Chat = dynamic(() => import("@/app/chat/watch-party/page"), { ssr: false })

export default function WatchPartyPage() {
	const [user, setUser] = useState<User | null>(null)
	const [isLandscape, setIsLandscape] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) setUser(user)
			else router.push("/login/email")
		})
		return unsub
	}, [router])

	useEffect(() => {
		const updateLayout = () => {
			setIsLandscape(window.innerWidth > window.innerHeight)
			setIsMobile(window.innerWidth < 768)
		}
		updateLayout()
		window.addEventListener("resize", updateLayout)
		return () => window.removeEventListener("resize", updateLayout)
	}, [])

	if (!user) return null

	if (isMobile && isLandscape) {
		return (
			<div className="w-full h-screen overflow-hidden">
				<LivePlayer />
			</div>
		)
	}

	if (isMobile) {
		return (
			<div className="flex flex-col min-h-screen bg-neutral-950 text-white overflow-hidden">
				<div className="w-full aspect-video">
					<LivePlayer />
				</div>
				<div className="h-[calc(100vh-56.25vw)] overflow-y-auto">
					<Chat />
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-row min-h-screen bg-neutral-950 text-white overflow-hidden">
			<div className="flex-1 flex flex-col">
				<div className="aspect-video w-full max-h-[80vh]">
					<LivePlayer />
				</div>
			</div>
			<div className="w-[400px] overflow-y-auto border-l border-gray-700">
				<Chat />
			</div>
		</div>
	)
}
