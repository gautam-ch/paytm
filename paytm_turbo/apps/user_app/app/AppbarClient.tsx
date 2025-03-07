"use client"

import {signIn,signOut,useSession} from "next-auth/react";
// @ts-ignore
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient(){
     const session = useSession();
     const router  = useRouter();

     return(
        <div>
                <Appbar onSignin={signIn} onSignout={async()=>{
                    signOut
                    router.push('/api/auth/signin')
                } }
                user={session.data?.user}
                />
        </div>

     )

}
