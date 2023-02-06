import { Request } from "express";
import mongoose from "mongoose";

interface CustomRequest extends Request {
  user?: mongoose.Schema.Types.ObjectId
  pathToFile?: string
}

export default CustomRequest