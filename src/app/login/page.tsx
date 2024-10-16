"use client"

import { useState,useEffect } from "react";
import Link from "next/link";
import {ROUTES} from "@/app/constants/routes"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Menu } from "@/components/menu";

export default function Home() {
    const [login,setLogin] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [error,setError] = useState<boolean>(false)
    const router = useRouter()

    const MakeLogin = async () => {
        try{
          const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email:login,
              password:password
            }),
          });
          const result = await response.json();
          sessionStorage.setItem("Token",result.Token)
          console.log(sessionStorage.getItem("Token"));
          setError(false)
          router.push("/market")
        }catch(err){
          setError(true)
        }
      };
      
    return (
      <>
        <Menu rigthMenu={false}/>
        <div  className=" flex justify-center aling-center mt-6 mb-6">
          <div className="flex flex-col p-6 rounded-md w-4/5 md:w-1/3">
            <label htmlFor="login" className="text-black text-medium">Email:</label>
            <input type="text" name="login" placeholder="Digite seu login" className="p-2 border-2 text-small text-black" value={login} onChange={(e)=>{setLogin(e.target.value)}} />
            <label htmlFor="password" className="text-black text-medium">Senha:</label>
            <input type="text" name="password" placeholder="Digite sua senha" className="p-2 text-small text-black border-2" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            {error&&<div className="text-red-950">Senha ou email incorreto!!</div>}
            <button type="submit" className="bg-black mt-6 rounded-[10px] text-white p-3" onClick={()=>{MakeLogin()}}>Login</button>
            <Link href={ROUTES.resgisteUser} className="text-black mt-2 text-center">Criar Conta!</Link>
          </div>
        </div>
      </>
  );
}