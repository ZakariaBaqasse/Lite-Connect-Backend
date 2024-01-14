import { Schema, model } from "mongoose";

const User = model('User',new Schema({
   username: String,
   email: String,
   password: String,
   bio: String,
   profileImage: String,
   coverImage: String
}));

export default User;