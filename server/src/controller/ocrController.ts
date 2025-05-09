import { Request, Response } from "express";
import { StatusCode } from "../constants/statusCode";
import { createWorker } from "tesseract.js";
import extractBackInfo from "../utils/extractBack";
import extractFrontInfo from "../utils/extractFront";
import isFrontSide from "../utils/isFrontSide";

export const handleOCR = async (req:Request,res:Response):Promise<void>=>{
    try {
        if (!req.files || typeof req.files !== 'object' || !('front' in req.files) || !('back' in req.files)) {
            res.status(StatusCode.BAD_REQUEST).json({ success: false, message: 'Files are missing or invalid' });
            return
          }
          const files = req.files
          const frontImages = files['front'];
          const backImages = files['back'];

          const frontPath = frontImages[0].path
          const backPath = backImages[0].path

          const worker = await createWorker('eng') 

          const [frontResult, backResult] = await Promise.all([
            worker.recognize(frontPath),
            worker.recognize(backPath),
          ]);

          await worker.terminate();

          const frontText = frontResult.data.text;
          const backText = backResult.data.text;
         
          if (!isFrontSide(frontText)) {
            res.status(StatusCode.BAD_REQUEST).json({
              success: false,
              message: "The uploaded front image does not appear to be the front side of Aadhaar card.",
            });
            return;
          }

          const frontData = extractFrontInfo(frontText)
          const backData = extractBackInfo(backText)



          const result ={
            name:frontData.name,
            dob:frontData.dob,
            gender:frontData.gender,
            aadharNumber:frontData.aadharNumber,
            address : backData.address,
            success: true,
            message: "Aadhaar data extracted successfully."
          }
          res.status(StatusCode.OK).json(result);
    } catch (error) {
        console.error("OCR error:", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: "Something went wrong with OCR." });
    }
}