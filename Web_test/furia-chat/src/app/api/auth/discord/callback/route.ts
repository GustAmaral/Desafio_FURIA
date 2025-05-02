import { auth } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { signInWithCustomToken } from "firebase/auth";

export async function GET(req: NextRequest) {
	try {
		const code = req.nextUrl.searchParams.get("code");
		if (!code) return NextResponse.redirect("/");

		const body = new URLSearchParams({
			client_id: process.env.DISCORD_CLIENT_ID!,
			client_secret: process.env.DISCORD_CLIENT_SECRET!,
			grant_type: "authorization_code",
			code,
			redirect_uri: process.env.DISCORD_REDIRECT_URI!,
			scope: "identify email",
		});

		// Troca o código por um access_token
		const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body,
		});

		const tokenData = await tokenRes.json();
		if (!tokenData.access_token) return NextResponse.redirect("/");

		// Usa o token para buscar dados do usuário
		const userRes = await fetch("https://discord.com/api/users/@me", {
			headers: {
				Authorization: `Bearer ${tokenData.access_token}`,
			},
		});

		const discordUser = await userRes.json();

		// Agora gere um token personalizado com Firebase Admin
		const admin = (await import("firebase-admin")).default;
		if (!admin.apps.length) {
			admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)),
              });              
		}

		const customToken = await admin.auth().createCustomToken(discordUser.id, {
			name: discordUser.username,
			email: discordUser.email,
		});

		// Redireciona para uma página que faz login com esse custom token
		const loginUrl = `http://localhost:3000/login/discord?token=${customToken}`;
		return NextResponse.redirect(loginUrl);
	} catch (err) {
		console.error("Erro no callback do Discord:", err);
		return new NextResponse("Erro interno no servidor", { status: 500 });
	}
}
