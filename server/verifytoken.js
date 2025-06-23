import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifytoken = (req, res, next) => {
   

  let token = req.cookies?.access_token;

  
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(401, "You are not authenticated"));

     
    req.user = { 
      _id: user.id, 
      channelId: user.channelId 
    };

     
    next();
  });

   
};