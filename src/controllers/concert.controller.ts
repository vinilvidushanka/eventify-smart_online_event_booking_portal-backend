import {Request,Response} from "express";
import * as concertService from "../services/concert.service";
import {ConcertDto} from "../dto/concert.dto";

export const getAllConcerts = async (req:Request,res:Response) => {
    try {
        const concerts = await concertService.getAllConcerts();
        res.status(200).json(concerts);
    }catch (error) {
        console.error(error);
        res.status(500).json({error:"Something went wrong"});
    }
}

/*export const saveConcert = async (req:Request,res:Response) => {
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
}*/

export const saveConcert = async (req: Request, res: Response) => {
    try {
        // multer මගින් upload කරපු file එක
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const {
            title,
            description,
            price,
            currency,
            venue,
            date,
            time,
        } = req.body;

        // අවශ්‍ය සියලු fields පවතිනවාද කියලා check කරන්න
        if (
            !title ||
            !description ||
            !price ||
            !currency ||
            !venue ||
            !date ||
            !time
        ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // file buffer එක base64 encode කරලා Data URL එකක් හදන්නෙ
        const imageBase64 = imageFile.buffer.toString("base64");
        const imageDataUrl = `data:${imageFile.mimetype};base64,${imageBase64}`;

        // payload එකට type cast කරලා assign කරනවා
        const concertPayload: ConcertDto = {
            title: String(title).trim(),
            description: String(description).trim(),
            price: parseFloat(price),
            currency: String(currency).trim(),
            venue: String(venue).trim(),
            date: String(date),
            time: String(time),
            image: imageDataUrl,
        };

        // service එකෙන් validate කරනවා
        const validationError = await concertService.validateConcert(concertPayload);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        // DB එකට save කරනවා
        const savedConcert = await concertService.saveConcert(concertPayload);

        return res.status(201).json(savedConcert);
    } catch (error) {
        console.error("saveConcert error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

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