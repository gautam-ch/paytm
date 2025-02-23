"use client"
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textInput";
import  transfer     from "../app/lib/actions/transfer";
import { useState } from "react";
import { Center } from "@repo/ui/center";

export const SendCard=()=>{
    const [amount,setAmount] = useState("");
    const [number,setNumber] = useState("");


    return(
         
         <div  className="h-[90vh]">
        <Center>
                <Card title="Send" >
                    <div className="min-w-72 pt-2">
                    <TextInput placeholder="989*******" onChange={(val)=>{setNumber(val)} } label="Number"/>
                    <TextInput placeholder="100" onChange={(val)=>{setAmount(val)} } label="Amount"/>
                        <div className="mt-5     flex justify-center">
                            <Button onClick={async()=>{
                                    console.log(number,amount);
                                await transfer(number,amount,'Paytm Wallet');
                                window.location.href='/transfer'

                            } } >Send</Button>
                        </div> 
                    </div>   
                </Card>
        </Center>
        </div>        
        

       
    )
}