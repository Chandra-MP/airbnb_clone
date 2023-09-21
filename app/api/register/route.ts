import bcrypt from 'bcrypt'
import prisma from "@/app/libs/prismadb"
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {

    //Retreving the form content from the Request for Register coming from RegisterModal
    const body = await request.json();
    const {
        email,
        name,
        password,
    } = body;

    //Hashing the Password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);


    //Creating user with the Entered credentials
    const user = await prisma.user.create({
        data: {
            email,
            name, 
            hashedPassword
        }
    });

    return NextResponse.json(user);
}   