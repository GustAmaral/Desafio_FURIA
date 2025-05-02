import admin from 'firebase-admin'

// Verifique se o Admin SDK já foi inicializado
if (!admin.apps.length) {
    try {
        // Inicialize o Admin SDK com as suas credenciais de serviço
        admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)),
        })
    } catch (error: any) {
        console.error('Erro ao inicializar o Firebase Admin SDK:', error)
    }
}

export const firebaseAdmin = admin
export const auth = admin.auth()
export const db = admin.firestore() // Se você for usar o Firestore no backend também