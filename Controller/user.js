import User from "../Models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        const sanitizedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
        
        };

        res.status(200).json({ message: "Successful login", token, user: sanitizedUser });
    } catch (error) {
        console.log("Problem while logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }


        let user = await User.findOne({ email });

        if (user) {
            return res.status(404).json({ message: "user alredy exist" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPass })

        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        const sanitizedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
        
        };

        res.status(200).json({ message: "User created successfully", token, user :sanitizedUser});

    } catch (error) {
        console.log("Problem while registering the user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }


}