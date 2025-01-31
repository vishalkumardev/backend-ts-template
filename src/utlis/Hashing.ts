var bcrypt = require("bcryptjs");

const hashPassword = (password: string) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);
        return hashPassword;
    } catch (error) {
        console.log(error);
    }
};

const comparePassword = (password: string, hashPassword: string) => {
    try {
        var result = bcrypt.compareSync(password, hashPassword);
        return result;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { hashPassword, comparePassword };
