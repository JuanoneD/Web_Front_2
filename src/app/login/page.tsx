"use client"

import { useState,useEffect } from "react";
import Link from "next/link";
import {ROUTES} from "@/app/constants/routes"

export default function Home() {
    const [login,setLogin] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [error,setError] = useState<boolean>(false)

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
          localStorage.setItem("Token",result.Token)
          console.log(localStorage.getItem("Token"));
          setError(false)
        }catch(err){
          setError(true)
        }
      };
      
    return (
      <div  className=" flex justify-center aling-center mt-6 mb-6">
        <div className="flex flex-col bg-cyan-700 p-6 rounded-md w-2/3">
          <label htmlFor="login" className="text-white text-medium">Email:</label>
          <input type="text" name="login" placeholder="Digite seu login" className="p-1 text-small text-black" value={login} onChange={(e)=>{setLogin(e.target.value)}} />
          <label htmlFor="password" className="text-white text-medium">Senha:</label>
          <input type="text" name="password" placeholder="Digite sua senha" className="p-1 text-small text-black" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          {error&&<div className="text-red-100">Senha ou email incorreto!!</div>}
          <button type="submit" className="bg-white mt-6 rounded-md text-black" onClick={()=>{MakeLogin()}}>Login</button>
          <Link href={ROUTES.resgisteUser} className="text-white mt-2">Criar Conta!</Link>
        </div>
      </div>
  );
}