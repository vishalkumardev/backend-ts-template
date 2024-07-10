import User from "./user.model";

const registerUser = async (data: any) => {
    try {
        const userRegister = await User.create(data);
        return userRegister;
    } catch (error) {
        console.error(error);
    }
};

const getUser = (email: string) => {
    try {
        return User.findOne({ where: { email: email } });
    } catch (error) {
        console.error(error);
    }
};

export { registerUser, getUser };
