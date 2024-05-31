import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({ message: "Not Authentication" });
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if (err) return res.status(403).json({ message: "Token is not valid" });
            req.userId = payload.id;
            // console.log(`verifyToken UserID: ${req.userId}`);
            next();
        });
        // next()
        // res.status(200).json({ message: "You are Authenticated" });
    } catch (error) {
        res.status(500).json({ message: "Failed to login!" });
    }
}
