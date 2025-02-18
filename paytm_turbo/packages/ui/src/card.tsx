
import { JSX } from "react";

export function Card({title,children}:{title:string,children:React.ReactNode}):JSX.Element{
   

  return (
         
    <div className="border p-4">

         <h1 className="border-b text-xl pb-2">{title}</h1>
             
           <div>{children}</div>
    </div>
  )
     
}
