"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/app/constants/routes"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Menu } from "@/components/menu";

export default function registerProduct() {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>()
    const [stock, setStock] = useState<number>()
    const [idProduct, SetidProduct] = useState<number>()
    const [error, setError] = useState<boolean>(false)
    const router = useRouter()

    const NewProduct = async () => {
        if(name=="" || description=="" || price==undefined || price<=0 || stock==undefined || stock<=0 || idProduct==undefined || idProduct<=0){
            setError(true)
            return
        }
        try {
            const response = await fetch(`http://localhost:8080/products?id=${idProduct}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price,
                    stock: stock
                }),
            });
            if (response.status != 200) {
                setError(true)
                return
            }
            let a = await response.json()
            console.log(a)
            setError(false)
            alert("Editado com sucesso!!")
            router.push(ROUTES.market)
        } catch (err) {
            setError(true)
        }
    };

    return (
        <>
            <Menu rigthMenu={true} />
            <div className=" flex justify-center aling-center mt-6 mb-6">
                <div className="flex flex-col p-6 rounded-md w-4/5 md:w-1/3">
                <label htmlFor="price" className="text-black text-medium">ID do Produto:</label>
                    <input type="number" name="price" placeholder="ID do Produto" className="p-2 text-small text-black border-2" value={idProduct} onChange={(e) => { SetidProduct(Number(e.target.value)) }} />
                    <label htmlFor="Name" className="text-black text-medium">Nome do Produto:</label>
                    <input type="text" name="Name" placeholder="Digite o nome do produto" className="p-2 border-2 text-small text-black" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <label htmlFor="description" className="text-black text-medium">Descrição:</label>
                    <input type="text" name="description" placeholder="Digite a descrição do produto" className="p-2 text-small text-black border-2" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    <label htmlFor="price" className="text-black text-medium">Preço:</label>
                    <input type="number" step="0.01" name="price" placeholder="Digite o preço" className="p-2 text-small text-black border-2" value={price} onChange={(e) => { setPrice(Number(e.target.value)) }} />
                    <label htmlFor="stock" className="text-black text-medium">Estoque:</label>
                    <input type="number" name="stock" placeholder="Digite o preço" className="p-2 text-small text-black border-2" value={stock} onChange={(e) => { setStock(Number(e.target.value)) }} />
                    {error && <div className="text-red-950">Erro ao Editar Produto!!</div>}
                    <button type="submit" className="bg-black mt-6 rounded-[10px] text-white p-3" onClick={() => { NewProduct() }}>Editar produto</button>
                </div>
            </div>
        </>
    );
}