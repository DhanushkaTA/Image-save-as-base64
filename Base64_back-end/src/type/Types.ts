import mongoose from "mongoose";

export interface ImageInterface extends mongoose.Document{
    id:number,
    image:string
}