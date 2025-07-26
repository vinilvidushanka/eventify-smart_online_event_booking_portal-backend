import {Router} from "express";
import {
    saveConcert,
    getAllConcerts,
    getConcertById,
    updateConcert,
    deleteConcert
} from "../controllers/concert.controller";
import{authorizeRoles} from "../middleware/auth.middleware";

const concertRouter:Router = Router();

concertRouter.post("/save",authorizeRoles("organizer"),saveConcert);
concertRouter.get("/all", authorizeRoles("organizer", "customer"), getAllConcerts);
concertRouter.get("/:id",getConcertById);
concertRouter.put("/update/:id",authorizeRoles("organizer"),updateConcert);
concertRouter.delete("/delete/:id",authorizeRoles("organizer"),deleteConcert);

export default concertRouter;