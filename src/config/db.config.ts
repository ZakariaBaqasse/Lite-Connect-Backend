import { connect } from "mongoose"

export const connectToDB =async () => {
    try{
        await connect(process.env.DB_URL as string);
        console.log("connected");
    }catch(error){
        console.log('Error in connectToDB',error);
    }
}