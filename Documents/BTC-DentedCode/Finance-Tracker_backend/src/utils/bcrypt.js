import bcrypt from "bcrypt";

const saltRounds = 5;

export const hashPassword =(password) =>{
    return bcrypt.hashSync(password, saltRounds);
}

export const comparePassword =(password, hashPassword)=>{
    return bcrypt.compareSync(password, hashPassword);
}