import { Router } from "express";
import passport from "../config/passport.config.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const router = Router();

// Login: devuelve JWT si es correcto
router.post(
    "/login",
    passport.authenticate("login", { session: false }),
    async (req, res) => {
        const user = req.user;
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        console.log("JWT_SECRET usado para firmar:", process.env.JWT_SECRET); //console log para debugger

        const token = jwt.sign(payload, process.env.JWT_SECRET || "ultrasecreto", {
            expiresIn: "1h"
        });
        res.json({ message: "Login exitoso", token });
    }
);

// Ruta protegida: /current
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { _id, first_name, last_name, email, age, cart, role } = req.user;
        res.json({
            user: { _id, first_name, last_name, email, age, cart, role }
        });
    }
);

export default router;
