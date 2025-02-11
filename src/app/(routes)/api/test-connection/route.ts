import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Essayer de se connecter à la base de données
    await prisma.$connect();
    return NextResponse.json({ message: 'Connexion à la base de données réussie!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Impossible de se connecter à la base de données' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
