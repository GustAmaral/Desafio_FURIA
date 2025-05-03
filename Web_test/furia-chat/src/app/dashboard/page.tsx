"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import DesktopDashboardPage from "../components/DesktopDashboardPage";
import MobileDashboardPage from "../components/MobileDashboardPage";

export default function DashboardPage() {
	const router = useRouter();
	const pathname = usePathname();
	const [user, setUser] = useState<User | null>(null);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				if (!isLoggingOut) {
					alert("É necessário fazer o login antes de prosseguir!");
				}
				router.push("/");
			}
		});
		return () => {
			window.removeEventListener("resize", handleResize);
			unsubscribe();
		};
	}, [router, isLoggingOut]);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		await signOut(auth);
		router.push("/");
	};

	const toggleSettingsMenu = () => {
		setIsSettingsOpen(!isSettingsOpen);
	};

	const isActive = (route: string) => {
		return pathname === route;
	};

	return (
		<div className="h-screen bg-gray-50">
			{isMobile ? (
				<MobileDashboardPage
					onLogout={handleLogout}
					toggleSettingsMenu={toggleSettingsMenu}
					isSettingsOpen={isSettingsOpen}
					isActive={isActive}
				/>
			) : (
				<DesktopDashboardPage isMobile={isMobile} onLogout={handleLogout} />
			)}
		</div>
	);
}
