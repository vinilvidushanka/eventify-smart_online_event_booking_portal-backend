import Event from "../model/event.model";
import {EventDto} from "../dto/event.dto";

export const saveEvent = async (eventDto: EventDto) : Promise<EventDto> => {
    return await Event.create(eventDto);
}

export const getAllEvents = async ():Promise<EventDto[]> => {
    return Event.find();
}

export const getEventById = async (eventId: number):Promise<any> => {
    Event.findOne({id:eventId});
}

export const updateEvent = async (eventId: number, data: EventDto) => {
    const event = await Event.findOneAndUpdate({ id: eventId }, data, { new: true });

    if (!event) {
        return null;
    }
    return event;
}

export const deleteEvent = async (eventId: number) => {
    await Event.deleteOne({id:eventId});
    return true;
}

export const validateEvent = async (event : EventDto) :Promise<string | null> => {
    if (!event.title || !event.description || !event.price || !event.image || !event.currency || !event.venue || !event.date || !event.time) {
        return "All fields are required";
    }
    return null;
}
