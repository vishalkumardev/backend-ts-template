import { Request, Response } from "express";
import ApiResponse from "../../utlis/ApiResponse";
import { registerUser, getUser } from "./user.service";
import { validateRegister } from "./user.validation";
import { sendMail } from "../../utlis/Mail";

const addUser = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const validation = validateRegister(data);

        if (validation.fails()) {
            return res.send(
                new ApiResponse(400, false, "", {}, validation.errors)
            );
        }

        const userExist = await getUser(data.email);

        if (userExist) {
            return res.send(new ApiResponse(400, false, "User already exists"));
        }

        const userRegister = await registerUser(data);

        if (userRegister) {
            await sendMail(
                data.email,
                "Welcome to the Practice Problem",
                "Test Mail"
            );
            return res.send(
                new ApiResponse(200, true, "User registered successfully")
            );
        }

        return res.send(new ApiResponse(400, false, "Failed to register user"));
    } catch (error) {
        return res.send(new ApiResponse(500, false, error.message));
    }
};

export { addUser };
