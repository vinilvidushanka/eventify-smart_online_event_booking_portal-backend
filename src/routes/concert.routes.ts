import {Router} from "express";
import {
    saveConcert,
    getAllConcerts,
    getConcertById,
    updateConcert,
    deleteConcert
} from "../controllers/concert.controller";
import{authorizeRoles} from "../middleware/auth.middleware";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

const concertRouter:Router = Router();

concertRouter.post("/save", upload.single("image"),authorizeRoles("organizer"),saveConcert);
concertRouter.get("/all", authorizeRoles("organizer", "customer"), getAllConcerts);
concertRouter.get("/:id",getConcertById);
concertRouter.put("/update/:id",authorizeRoles("organizer"),updateConcert);
concertRouter.delete("/delete/:id",authorizeRoles("organizer"),deleteConcert);

export default concertRouter;