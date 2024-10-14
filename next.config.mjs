/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:()=>{
        return[
            {
                source:"/login",
                destination:"/login"
            },
            {
                source:"/registerUser",
                destination:'/registerUser'
            },
            {
                source:"/",
                destination:"/market"
            },
            {
                source:"/cart",
                destination:"/cart"
            }
        ]
    }
};

export default nextConfig;
