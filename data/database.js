import mongoose from "mongoose";


export const connectDb = async()=>{


    try{
      await  mongoose.connect(process.env.MONGO_URI)
      console.log("succesfully connected DB");
    }
    catch (error) {
        console.log("problem while connecting with DB: " , error);
    }
}