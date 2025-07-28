import multer from "multer";
import path from "path";

// Store files in uploads folder with original name
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Ex: 169048123.png
    }
});

export const upload = multer({ storage });
