'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "../constants/routes"


interface IData{
    currentCart:{
        id:number,
        totalPrice:number,
    },
    allProducts:{
        id:number,
        price:number,
        quantity:number,
        Product:{
            id:number,
            name:string,
            description:string,
            price:number,
            stock:number,
        }
    }[]
}

const Cart = ()=>{
    const router = useRouter()
    const [data,setData] = useState<IData>()

    useEffect(()=>{
        if(!localStorage.getItem("Token")){
            router.push(ROUTES.login)
        }
        const load = async()=>{
            const res = await fetch("http://localhost:8080/cart/",{
                headers:{
                    'authorization': `${localStorage.getItem("Token")}`
                }
            })

            if(res.status===401){
                router.push(ROUTES.login)
            }
            const dataJson = await res.json()
            setData(dataJson)
        }
        load()
    },[])
    
    return(
        <>
        <div>
            <div>
                <h1>Carrinho</h1>
            </div>
            <div>
                <p>Preco Total:{data?.currentCart.totalPrice}</p>

            </div>

        </div>
        </>
    )
}

export default Cart;