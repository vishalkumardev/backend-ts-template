import { NextFunction, Request, Response } from "express";
var jwt = require("jsonwebtoken");

const generateToken = (data: { email: string; name: string; id: number }) => {
    const token = jwt.sign(
        {
            email: data.email,
            name: data.name,
            userId: data.id,
        },
        process.env.SECRET_KEY
    );
    return token;
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Get auth header value
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            data: {
                message: "Please login to continue.",
                unauthenticated: true,
            },
            message: {
                error: ["Unauthorized access restricted."],
            },
        });
    }

    const token = authHeader.slice(7);
    // Verify the token
    jwt.verify(
        token,
        process.env.SECRET_KEY,
        async (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    data: {
                        name: "JsonWebTokenError",
                        message: "jwt malformed",
                    },
                    message: {
                        error: ["Unauthorized access restricted."],
                    },
                });
            }

            req.user = decoded;
            next();
        }
    );
};

const decodeToken = (token: string) => {
    const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err: any, decode: any) => {
            if (err) {
                return {
                    success: false,
                    message: "Unauthorized access restricted.",
                    data: {},
                };
            }
            return decode;
        }
    );
    return decoded;
};

module.exports = { generateToken, verifyToken, decodeToken };
