import prisma from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    pages: {
        signIn: '/sign-in'
    },
    callbacks: {
        async signIn({ user }) {
            // console.log(user);
            let { name, email, image } = user;
            let fuser = await prisma.users.findUnique({
                where: {
                    email: email ?? ""
                }
            });
            if(!fuser) {
                let user = await prisma.users.create({
                    data: {
                        full_name: name ?? "",
                        profile_picture: image,
                        email: email ?? "",
                        password: "lifeupd@1234"
                    }
                });
                // console.log(user.userid);
                const token = jwt.sign({is_auth_user: user.userid}, process.env.JWT_SECRET ?? "", { expiresIn: '30d' });
                cookies().set({
                    name: 'is_auth_user',
                    value: token
                });
            } else {
                let id = fuser.userid;
                const token = jwt.sign({is_auth_user: id}, process.env.JWT_SECRET ?? "", { expiresIn: '30d' });
                cookies().set({
                    name: 'is_auth_user',
                    value: token
                });
            }
            return true;
        },
    }
});

export { handler as GET, handler as POST }