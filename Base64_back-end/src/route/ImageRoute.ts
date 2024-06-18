import express from "express";
import * as ImageController from '../controller/ImageController'

let router = express.Router();


router.post('/upload',ImageController.saveImage)

router.get('/get/:id',ImageController.getImage)

export default router