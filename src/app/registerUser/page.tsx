"use client"

import { useState} from "react";
import {ROUTES} from "@/app/constants/routes"
import Link from "next/link";
import {useRouter} from 'next/navigation'
import { Menu } from "@/components/menu";

export default function Home() {
    const [login,setLogin] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [date,setDate] = useState<string>("")
    const [error,setError] = useState<boolean>(false)
    const router = useRouter()

    const RegisterUser = async () => {
        try{
          const response = await fetch('http://localhost:8080/users/newUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email:login,
              password:password,
              data_nasc:date
            }),
          });
          const result = await response.json();
          if(response.status === 500){
              setError(true)
            }else{
                setError(false)
                window.location.href = ROUTES.login;
                router.push(ROUTES.login)

            }
            console.log(result)
        }catch(err){
          setError(true)
        }
      };
      
    return (
      <>
        <Menu rigthMenu={false}/>
        <div  className=" flex justify-center aling-center mt-6 mb-6">
          <div className="flex flex-col  p-6 rounded-md w-5/6 md:w-1/3">
            <Link href={ROUTES.login}>⬅️</Link>
            <label htmlFor="login" className="text-black text-medium">Email:</label>
            <input type="text" name="login" placeholder="Digite seu email" className="p-2 text-small text-black border-2" value={login} onChange={(e)=>{setLogin(e.target.value)}} />
            <label htmlFor="password" className="text-black text-medium">Senha:</label>
            <input type="text" name="password" placeholder="Digite sua senha" className="p-2 text-small text-black border-2" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <label htmlFor="date" className="text-black text-medium mt-2">Data Nascimento:</label>
            <input type="date" name="date" className="p-2 text-small text-black border-2" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
            {error&&<div className="text-red-100">Dados incorretos!!</div>}
            <button type="submit" className="bg-black mt-6 rounded-md text-white p-2" onClick={()=>{RegisterUser()}}>Criar Conta</button>
          </div>
        </div>
      </>
  );
}