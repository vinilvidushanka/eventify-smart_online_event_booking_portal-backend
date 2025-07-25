import {Request,Response} from "express";
import * as concertService from "../services/concert.service";

export const getAllConcerts = async (req:Request,res:Response) => {
    try {
        const concerts = await concertService.getAllConcerts();
        res.status(200).json(concerts);
    }catch (error) {
        console.error(error);
        res.status(500).json({error:"Something went wrong"});
    }
}

export const saveConcert = async (req:Request,res:Response) => {
    try {
        const newConcert = req.body;
        const validationError = await concertService.validateConcert(newConcert);
        if (validationError) {
            res.status(400).json({error: validationError});
            return;
        }
        const saveConcert = await concertService.saveConcert(newConcert);
        res.status(201).json(saveConcert);
    }catch (error) {
        console.error(error);
        res.status(500).json({error:"Something went wrong"});
    }
}

export const updateConcert = async (req:Request,res:Response) => {
    const concertId = parseInt(req.params.id);
    if (isNaN(concertId)) {
        res.status(400).json({error:"Invalid concert id"});
        return;
    }
    const updateData = req.body;
    const updatedConcert = await concertService.updateConcert(concertId,updateData);
    if (!updatedConcert) {
        res.status(404).json({error:"Concert not found"});
        return;
    }
    res.status(200).json(updatedConcert);
}

export const deleteConcert = async (req:Request,res:Response) => {
    const concertId = parseInt(req.params.id);
    if (isNaN(concertId)) {
        res.status(400).json({error:"Invalid concert id"});
        return;
    }
    const deletedConcert = await concertService.deleteConcert(concertId);
    if (!deletedConcert) {
        res.status(404).json({error:"Concert not found"});
        return;
    }
    res.status(200).json({message:"Concert deleted successfully"});
}

export const getConcertById = async (req:Request,res:Response) => {
    const concertId = parseInt(req.params.id);
    if (isNaN(concertId)) {
        res.status(400).json({error:"Invalid concert id"});
        return;
    }
    const concert = await concertService.getConcertById(concertId);
    if (!concert) {
        res.status(404).json({error:"Concert not found"});
        return;
    }
    res.status(200).json(concert);
}