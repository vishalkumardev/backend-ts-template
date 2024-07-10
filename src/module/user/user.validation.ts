import Validator from "validatorjs";

const validateRegister = (data: any) => {
    const rules = {
        name: "required|string",
        email: "required|email",
        password: "required|min:8",
    };

    const validation = new Validator(data, rules);
    return validation;
};

export { validateRegister };
