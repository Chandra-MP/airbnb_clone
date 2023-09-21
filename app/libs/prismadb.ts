import { Prisma, PrismaClient } from '@prisma/client';

//We import Prisma client, and we give global definition of prisma to use it throughout the app

declare global {
    var prisma: PrismaClient | undefined
}

//Created a constant client, which either searches for Global Prisma Client, or it creates a new Prisma Client
const client = globalThis.prisma || new PrismaClient()


//then we create a if clause to check whether we are in Development, if not, then we set the global Prisma client as newly create client.
if(process.env.NODE_ENV != 'production') globalThis.prisma = client

export default client;