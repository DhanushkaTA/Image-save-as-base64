import mongoose from "mongoose";
import {ImageInterface} from "../type/Types";

let imageSchema = new mongoose.Schema<ImageInterface>({
    id:{type:Number, required:true},
    image:{type:String, required:true},
});

let ImageModel = mongoose.model('image',imageSchema);
export default ImageModel;