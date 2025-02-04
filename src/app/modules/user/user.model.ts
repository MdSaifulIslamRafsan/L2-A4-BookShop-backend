import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: 0
  },
  role : {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  isActive:{
    type: Boolean,
    default: true,
  }
},
{
    timestamps: true,
});



const User = model<TUser>('User', userSchema);
export default User;


