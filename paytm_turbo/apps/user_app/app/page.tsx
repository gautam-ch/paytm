import { Button } from "@repo/ui/button";

import { PrismaClient } from "@repo/db/client";

const prisma =new  PrismaClient();

export default function Home() {
  return (
    <div>
                <h1 className="text-xl font-bold  underline">
                  Hello world!asdsadasdasd
                </h1>

                <Button className="bg-blue-500 rounded-md text-xl p-3 " appName="ght">CLICK ME</Button>

         
    </div>
  )
}   