import Concert from "../model/concert.model";
import { ConcertDto } from "../dto/concert.dto";

export const getAllConcerts = async (): Promise<ConcertDto[]> => {
    return Concert.find();
};

export const saveConcert = async (concert: ConcertDto): Promise<ConcertDto> => {
    return Concert.create(concert);
};

export const getConcertById = async (concertId: number):Promise<any> => {
    return Concert.findOne({id:concertId});
};

export const deleteConcert = async (concertId: number):Promise<boolean> => {
    await Concert.deleteOne({id:concertId});
    return true;
};

export const updateConcert = async (concertId: number, data: ConcertDto) => {
    const concert = await Concert.findOneAndUpdate({ id: concertId }, data, {new: true});
    if (!concert) {
        return null;
    }
    return concert;
};

export const validateConcert = async (concert: ConcertDto):Promise<string | null> => {
    if (!concert.title || !concert.description || !concert.price || !concert.image || !concert.currency || !concert.venue || !concert.date || !concert.time) {
        return "All fields are required";
    }
    return null;
};