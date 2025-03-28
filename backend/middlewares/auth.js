import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    // Debugging: Log incoming request headers and cookies
    // console.log("Cookies received:", req.cookies);
    // console.log("Authorization Header:", req.headers.authorization);

    // Get token from cookies
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("User not authenticated. Token missing.", 401));
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Debugging: Log decoded token payload
        // console.log("Decoded Token:", decoded);

        // Ensure decoded token has an ID
        if (!decoded.id) {
            return next(new ErrorHandler("Invalid token. User ID missing.", 403));
        }

        // Find user in DB
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return next(new ErrorHandler("User not found in database.", 404));
        }

        next();
    } catch (error) {
        // console.error("JWT Verification Error:", error);
        return next(new ErrorHandler("Invalid or expired token", 403));
    }
});
