import { NextFunction, Request, Response } from "express";
import Admin from "../models/admin.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllAdmins = async (req:Request, res:Response, next: NextFunction)=> {
    try {
        //get all Admins
        const users =  await Admin.find();
        return res.status(200).json({message: "OK", users })
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "ERROR", cause: error.message })
    }
}

export const adminSignup = async (req:Request, res:Response, next: NextFunction)=> {
    try {
        // Admin signup
        const {name, email, password} = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(401).send("admin already exists")
        const hashedPassword = await hash(password, 10);
        const admin =  new Admin({ name, email, password: hashedPassword });
        await admin.save();

        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        })

        const token = createToken(admin._id.toString(), admin.email, "7d");
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({message: "OK", name: admin.name, email: admin.email  })
    } catch (error) {
        console.log(error)
        return res.status(201).json({message: "ERROR", cause: error.message })
    }
}


export const adminLogin = async (req:Request, res:Response, next: NextFunction)=> {
    try {
        // Admin login
        const { email, password} = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin){
            return res.status(401).send("admin not found ")
        }
        const isPasswordCorrect = await compare(password, admin.password);
        if (!isPasswordCorrect){
            return res.status(403).send("Incorrect password")
        }
        
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        })

        const token = createToken(admin._id.toString(), admin.email, "7d");
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });



        return res.status(200).json({message: "OK", name: admin.name, email: admin.email  })
    } catch (error) {
        console.log(error)
        return res.status(201).json({message: "ERROR", cause: error.message })
    }
}

export const verifyAdmin = async (
    req: Request,
      res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const admin = await Admin.findById(res.locals.jwtData.id);
      if (!admin) {
        return res.status(401).send("admin not registered OR Token malfunctioned");
      }
      if (admin._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res
        .status(200)
        .json({ message: "OK", name: admin.name, email: admin.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  
  export const adminLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const admin = await Admin.findById(res.locals.jwtData.id);
      if (!admin) {
        return res.status(401).send("admin not registered OR Token malfunctioned");
      }
      if (admin._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
  
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
  
      return res
        .status(200)
        .json({ message: "OK", name: admin.name, email: admin.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };