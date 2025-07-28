import {Request,Response} from "express";
import * as eventService from "../services/event.service";

/*export const saveEvent = async (req:Request,res:Response)=>{
    /!*console.log("🎯 saveEvent triggered!");
    res.status(200).json({ message: "Save route working" });*!/
    try {
        const newEvent = req.body
        const validationError = await eventService.validateEvent(newEvent);
        const imagePath = req.file?.filename || "";
        if (validationError) {
            res.status(400).json({error: validationError});
            return;
        }
        const saveEvent = await eventService.saveEvent(newEvent);
        res.status(201).json(saveEvent);
    }catch (error) {
        console.error(error);
        res.status(500).json({error:"Something went wrong"});
    }
}*/

export const saveEvent = async (req: Request, res: Response) => {
    try {
        // req.body එකෙන් event data ගන්නවා
        const newEvent = req.body;

        // multer වලින් image එකක් upload වෙලා නම් filename එක ගන්නවා
        const imagePath = req.file?.filename || "";

        // newEvent object එකට imagePath එක assign කරන්න (DB එකට යවන object එක modify කරන්න)
        newEvent.image = imagePath;

        // validation එක හදාගන්නවා (eventService.validateEvent)
        const validationError = await eventService.validateEvent(newEvent);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }

        // Save event to DB (image field එක filename එකෙන් save වෙයි)
        const savedEvent = await eventService.saveEvent(newEvent);

        res.status(201).json(savedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};


export const getAllEvents =async (req:Request,res:Response)=>{
    try {
        const events  = await eventService.getAllEvents();
        res.status(200).json(events);
    }catch (error) {
        console.error(error);
        res.status(500).json({error:"Something went wrong"});
    }
}

export const getEventById = async (req:Request,res:Response)=>{
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId)) {
        res.status(400).json({error:"Invalid event id"});
        return;
    }
    const event = await eventService.getEventById(eventId);
    if (!event) {
        res.status(404).json({error:"Event not found"});
        return;
    }
    res.status(200).json(event);
}

export const updateEvent = async (req:Request,res:Response)=>{
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId)) {
        res.status(400).json({error:"Invalid event id"});
        return;
    }
    const updateData = req.body;
    const updatedEvent = await eventService.updateEvent(eventId,updateData);
    if (!updatedEvent) {
        res.status(404).json({error:"Event not found"});
        return;
    }
    res.status(200).json(updatedEvent);
}

export const deleteEvent = async (req:Request,res:Response)=>{
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId)) {
        res.status(400).json({error:"Invalid event id"});
        return;
    }
    const deletedEvent = await eventService.deleteEvent(eventId);
    if (!deletedEvent) {
        res.status(404).json({error:"Event not found"});
        return;
    }
    res.status(200).json({message:"Event deleted successfully"});
}