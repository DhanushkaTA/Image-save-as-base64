import express from 'express'
import cors from "cors"
import * as bodyParser from "body-parser";
import process from "process";
import * as mongoose from "mongoose";
import ImageRoute from "./route/ImageRoute";

let app = express();

app.use(cors({
    origin: "*",
    methods:"*"
}))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb://localhost/imageBase64').then( r => {
    console.log("DB Connected Successfully")
}).catch( error => {
    console.log(`DB Connection Error : ${error}`)
});

//------------------------------------------------------

app.use('/image',ImageRoute)


//------------------------------------------------------

app.listen(9000, () => {
    console.log("Server start on port 9000")
})