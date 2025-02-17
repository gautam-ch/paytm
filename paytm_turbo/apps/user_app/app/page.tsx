"use client"

const { PrismaClient } = require('@prisma/client');
import Balance from "../components/Balance";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut,useSession } from "next-auth/react";

const prisma =new  PrismaClient();

export default function Home() {
  const session = useSession();
  return (
    <div className="w-full h-full">
          <div >
            <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}></Appbar>
          </div>
{/*                 
                <div>
                      <h1 className="text-xl font-bold  underline">
                        Hello world!asdsadasdasd
                      </h1>
                          <div>
                            <Balance></Balance>
                          </div>

                   </div> */}
                

         
    </div>
  )
}   