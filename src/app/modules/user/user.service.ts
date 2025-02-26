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

const getUserFromDB = async (email : string) => {
    const result = await User.findOne({email})
    return result;
}

const updateUserRoleFromDB = async (id: string, role: "admin" | "user") => {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  };
  const updateUserStatusFromDB = async (id: string, isActive: boolean) => {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  };
  

export const UserService = {
    createUserIntoDB,
    getUsersFromDB,
    updateUserRoleFromDB,
    updateUserStatusFromDB,
    getUserFromDB
}