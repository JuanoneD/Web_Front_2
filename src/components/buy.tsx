"use client"
export const BtBuy = ({idProduct}:{idProduct:string})=>{
    const buy= async()=>{
        console.log(console.log(localStorage.getItem("Token")))
        console.log(idProduct)
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