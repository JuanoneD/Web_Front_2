"use client"
import { ROUTES } from "@/app/constants/routes";
import { useRouter } from "next/navigation"

export const BtBuy = ({idProduct}:{idProduct:string})=>{
  const router = useRouter();
    const buy= async()=>{
        if(!localStorage.getItem("Token")){
          router.push(ROUTES.login)
        }
        try{
            const response = await fetch('http://localhost:8080/cart/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `${localStorage.getItem("Token")}`
              },
              body: JSON.stringify({
                IdProduct:idProduct,
                quantity:1
              }),
            });
            if(response.status === 401){
              router.push(ROUTES.login)
            }
            const result = await response.json();
            console.log(result)
          }catch(err){
            console.log(err)
          }
    }
    return(
        <>
            <button onClick={()=>{buy()}}>Comprar</button>
        </>
    )
}