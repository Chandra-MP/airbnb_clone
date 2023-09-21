import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from '@/app/libs/prismadb'

//This is a direct communication from our database through server component, hence this is a server component to fetch currentUsers

//This is not an API call

export async function getSession(){
    //getServerSession functions returns the current session, it takes an argument where we provide the function authOptions that was in pages/api/auth/nextauth
    //since we have the current user in the nextauth.ts file, next-auth/next function getServerSession generates a session for the current Logged in User
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){

    try {

        const session = await getSession();

        //If there is no Session, Session does not exist
        if(!session?.user?.email){
            return null;
        }

        //Get the current user with the email
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        //If there is no currentUser
        if(!currentUser) return null;

        //Return the user if it exists
        return currentUser;

    }catch(error : any){
        return null;
    }
}