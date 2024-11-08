import JsonWebToken from "jsonwebtoken";

export const Sign_Access_JWT  = (obj) =>{
    console.log(process.env.ACCESS_SECRET_KEY)
    const token = JsonWebToken.sign(obj,process.env.ACCESS_SECRET_KEY,{expiresIn:"1d"})

     return token;
}

