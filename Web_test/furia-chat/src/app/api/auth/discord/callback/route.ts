import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code")
    if (!code) return NextResponse.redirect("/")

    const body = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      scope: "identify email",
    })

    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    })

    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) return NextResponse.redirect("/")

    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const discordUser = await userRes.json()

    const admin = (await import("firebase-admin")).default
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)
        ),
      })
    }

    const customToken = await admin.auth().createCustomToken(discordUser.id, {
      name: discordUser.username,
      email: discordUser.email,
    })

    const firebase = await import("firebase/app")
    const { getAuth, signInWithCustomToken } = await import("firebase/auth")
    const { initializeApp } = firebase
    const clientApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    })

    const auth = getAuth(clientApp)
    const userCredential = await signInWithCustomToken(auth, customToken)
    const idToken = await userCredential.user.getIdToken(true)

    // Criar session cookie
    const adminAuth = admin.auth()
    const expiresIn = 60 * 60 * 24 * 7 * 1000
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`)
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: expiresIn / 1000,
    })

    return response
  } catch (err) {
    console.error("Erro no callback do Discord:", err)
    return new NextResponse("Erro interno no servidor", { status: 500 })
  }
}
