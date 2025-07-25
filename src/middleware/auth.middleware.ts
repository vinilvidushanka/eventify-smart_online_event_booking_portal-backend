import{NextFunction, Request,Response} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = (req:Request,res:Response,next:NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({error:'auth token is not present in ' + 'request header'});
        return;
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(401).json({error:'auth token is not valid'});
            return;
        }
        (req as Request & { user?: any }).user = user;
        next();
    });
};

export const authorizeRoles = (roles: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as Request & { user?: any }).user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({error:"Access denied! User doesn't have permission to perform this action"
            });
            return;
        }
        next();
    }
}

/*export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as Request & { user?: any }).user;
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({
                error: "Access denied! User doesn't have permission to perform this action"
            });
        }
        next();
    };
};*/
