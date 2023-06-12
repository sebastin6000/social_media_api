import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.__dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResoursePolicy({ policy: "crossOrigin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE //
// for more imformation refer multer package //
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (request, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// MONGO-DB DATABASE CONNECTION CONFIGURATION //
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connected to database`));
