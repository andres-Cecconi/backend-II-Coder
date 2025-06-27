import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserModel from "../models/User.js";
import { isValidPassword } from "../utils/helpers.js";
import dotenv from "dotenv";

dotenv.config();

// Estrategia local (email + password)
passport.use(
    'login',
    new LocalStrategy(
        { usernameField: "email", passwordField: "password", session: false },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) return done(null, false, { message: "Usuario no encontrado" });
                if (!isValidPassword(user, password)) return done(null, false, { message: "Contraseña incorrecta" });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

console.log("JWT_SECRET usado por passport:", process.env.JWT_SECRET);//console log para debugger

// Estrategia JWT (para proteger rutas)
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "ultrasecreto"
};

passport.use(
    'jwt',
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await UserModel.findById(jwt_payload.id);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    })
);

export default passport;
