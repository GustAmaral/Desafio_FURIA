import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { initializeApp, getApps } from "firebase-admin/app"

if (!getApps().length) {
  initializeApp({
    credential: require("firebase-admin").credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)
    ),
  })
}

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  try {
    await getAuth().verifySessionCookie(sessionCookie, true)
    return NextResponse.next()
  } catch (err) {
    console.error("Sessão inválida:", err)
    return NextResponse.redirect(new URL("/", req.url))
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",   // Protege tudo dentro de /dashboard
    "/chat/:path*",        // Protege tudo dentro de /chat
  ],
}
