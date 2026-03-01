import { asyncHandler } from "../utils/asynchandlers.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "anmol is good"
    });
});

export { registerUser };