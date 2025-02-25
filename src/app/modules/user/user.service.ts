// import { StatusCodes } from "http-status-codes"
import User from "./user.model"
import { TUser } from "./user.interface";


const createUserIntoDB = async(payload : TUser) => {

    const isExistUser = await User.findOne({email: payload.email})

    if(isExistUser){
        throw new Error("User already exists")
    }



const result = await User.create(payload);
const newUser = {
    _id : result?._id,
    name : result?.name,
    email : result?.email,
}


return newUser;
}
const getUsersFromDB = async() => {
    const result = await User.find()
    return result;
}



export const UserService = {
    createUserIntoDB,
    getUsersFromDB
}