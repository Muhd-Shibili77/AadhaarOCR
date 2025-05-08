import { Router,Request,Response } from "express";
import upload from "../utils/multer";
import { handleOCR } from "../controller/ocrController";
const router = Router()

router.post('/',upload.fields([{ name: 'front', maxCount: 1},{name: 'back', maxCount: 1}]),handleOCR)


export default router