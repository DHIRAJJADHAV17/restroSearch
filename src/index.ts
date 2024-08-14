import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import AdminRoutes from "./routes/MyAdminRoutes";
import RestroRoutes from "./routes/MyRestroRoutes";
import Restro from "./routes/RestroRoute";
import { v2 as cloudinary } from "cloudinary";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

mongoose
  .connect(process.env.MONGODB_CONNECTION as string)
  .then(() => console.log("connected to database"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(express.json());
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restro API Documentation",
      version: "0.1",
      description:
        "This is a Restro Manage application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:7000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});

app.use("/api/my/admin", AdminRoutes);
app.use("/api/my/restro", RestroRoutes);
app.use("/api/restro", Restro);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
