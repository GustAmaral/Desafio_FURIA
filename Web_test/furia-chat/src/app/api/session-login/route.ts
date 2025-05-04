import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { initializeApp, getApps, Credential } from "firebase-admin/app"
import { credential } from "firebase-admin"

if (!getApps().length) {
  initializeApp({
    credential: credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)
    ),
  })
}

export async function POST(req: NextRequest) {
  const { idToken } = await req.json()

  if (!idToken) {
    return new NextResponse("ID token ausente", { status: 400 })
  }

  try {
    const expiresIn = 60 * 60 * 24 * 7 * 1000 // 7 dias
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn })

    const response = new NextResponse("Logado com sucesso")
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: expiresIn / 1000,
    })

    return response
  } catch (err) {
    console.error("Erro ao criar session cookie:", err)
    return new NextResponse("Erro interno", { status: 500 })
  }
}
