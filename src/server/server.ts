import express from "express";
import "dotenv/config";
import "./shared/services/translationsYup";
import "./shared/utils/translate";
import { router } from "./routes";
const cors = require("cors");

const server = express();
server.use(
  cors({
    origin: "http://localhost:5174",
  })
);
server.use(express.json());
server.use(router);

export { server };
