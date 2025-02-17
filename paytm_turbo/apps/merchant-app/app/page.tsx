import { Button } from "@repo/ui/button";
import { PrismaClient } from '@prisma/client';
import Balance from "../components/Balance";
import { Appbar } from "@repo/ui/appbar";

const prisma =new  PrismaClient();

export default function Home() {
  return (
    <div> 
      
                <h1 className="text-xl font-bold  underline">
                  Hello from merchant 
                </h1>
                   <div>
                    <Balance></Balance>
                   </div>
                

         
    </div>
  )
}   