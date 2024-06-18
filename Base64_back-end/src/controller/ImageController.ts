import express from "express";
import ImageModel from "../model/ImageModel";
import {CustomResponse} from "../type/CustomResponse";

export const saveImage = async (
    req:express.Request,
    res:any,
    next:express.NextFunction
) => {

    try {


        let imageModel = new ImageModel({
            id: req.body.id,
            image: req.body.img
        });

        await imageModel.save()
            .then( success => {
                res.status(200).send(
                    new CustomResponse(200,"Image eka save",success)
                )
        })
            .catch( error => {
                res.status(500).send(
                    error
                )
            })

    }catch (error){
        console.log(error)
        res.status(500).send(
            error
        )
    }

}

export const getImage = async (
    req:express.Request,
    res:any,
    next:express.NextFunction
) => {

    try {


        let image = await ImageModel.findOne({id:req.params.id})

        res.status(200).send(
            new CustomResponse(200,"Image found",image)
        )

    }catch (error){
        console.log(error)
        res.status(500).send(
            error
        )
    }

}