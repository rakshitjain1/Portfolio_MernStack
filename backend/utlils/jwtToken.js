export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateWebToken();
    
    res.status(statusCode).cookie("token", token, {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
        httpOnly: true,  // Prevent client-side access
        secure: process.env.NODE_ENV === "production", // Secure cookies only in HTTPS
        sameSite: "None", // Allow cross-origin cookies
    })
    .json({
        success: true,
        message,
        user,
        token
    });
};
