import { Response } from "express";

const sendResponse = (
  res: Response,
  stateCode: number,
  message: string,
  data: any
) => {
  return res.status(stateCode).json({
    success: true,
    message,
    data,
  });
};

export default sendResponse;
