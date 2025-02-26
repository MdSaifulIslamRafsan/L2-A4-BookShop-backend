import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';

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
  passwordChangeAt: {
    type: Date,
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
userSchema.pre('save', async function(next){
this.password = await bcrypt.hash(
  this.password, 10
);
next();
})
userSchema.post('save',async function(doc, next){

  doc.password = ''
  next()
});



const User = model<TUser>('User', userSchema);
export default User;


