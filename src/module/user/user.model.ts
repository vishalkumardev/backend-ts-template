import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";

const User = sequelize.define(
    "User",
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "user",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        fcmToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
        freezeTableName: true,
    }
);

export default User;
