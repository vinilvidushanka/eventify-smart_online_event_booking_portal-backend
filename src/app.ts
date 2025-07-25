import express, {Express} from "express";
import concertRouter from "./routes/concert.routes";
import cors from "cors";
import eventRouter from "./routes/event.routes";
import authRouter from "./routes/auth.routes";
import {authenticateToken} from "./middleware/auth.middleware";

const app: Express = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

app.use(cors(corsOptions));
app.use("/api/auth", authRouter);
app.use("/api/events", authenticateToken, eventRouter);
app.use("/api/concerts", concertRouter);

export default app;