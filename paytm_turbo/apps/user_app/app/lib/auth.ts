import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name :{label:'Full Name',type:"text",placeholder:'Lucky bhist'},
            phone: { label: "Phone number", type: "text", placeholder: "93012*****" },
            password: { label: "Password", type: "password" }
          },
          
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        number: existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        name:credentials.name,
                        number: credentials.phone,
                        password: hashedPassword,
                        
                    }
                });

                return {
                    id: user.id.toString(),
                    name: user.name,
                    number: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
       
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }