import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";

import prisma from "@/app/libs/prismadb"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import Email from "next-auth/providers/email";

console.log("Inside nextauth.js");
export const authOptions: AuthOptions = {

    //This prismaAdapter needs to accept our Global Prisma Client which we created in pirsmadb.ts file inside /air_bnb/app/libs/prismadb.ts

    adapter: PrismaAdapter(prisma),

    providers: [

        GithubProvider({
            clientId : process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

        CredentialsProvider({
            name: "credentials", 
            credentials: {
                email : { label : 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {
                console.log("Inside nextAuth file from pages/api/auth/nextauth, inside authorize function")
                console.log(credentials?.email, credentials?.password)

                if(!credentials?.email || !credentials?.password){
                    console.log("Either email or Password were empty")
                    throw new Error("Invalid credentials");
                    
                }

                //since we pushed our prisma scheme, and have defined user as a model in the schema
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                //if user doesnt have a hashed password! ie if signed up from social sites ie google or github
                if(!user || !user?.hashedPassword) {
                    console.log("Either user was empty or no hashed password was there");
                    throw new Error("Invalid credentials!");
                    
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPassword){
                    console.log("password was incorrect")
                    throw new Error ('Invalid credentials');
                }

                return user;

            }
        })
    ],

    //URL for authentication-related pages

    pages: {
        signIn: '/',

    },


    //for more verbose bugs in dev mode

    debug: process.env.NODE_ENV == 'development', 

    session: {  
        strategy: 'jwt'
    },

    //The secret option specifies the secret key used to sign and verify JWT tokens. It's loaded from an environment variable (NEXTAUTH_SECRET) for security.
   
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)