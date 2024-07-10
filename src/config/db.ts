import { Sequelize } from "sequelize";
import { config } from "./config";

const sequelize = new Sequelize(
    config.database ?? "",
    config.username ?? "",
    config.password ?? "",
    {
        host: config.host ?? "",
        dialect: "mysql",
        port: 3306,
    }
);

const connectDb = () => {
    try {
        sequelize
            .authenticate({})
            .then(() => {
                sequelize
                    .sync({
                        logging: false,
                    })
                    .then(() => {
                        console.log(
                            "Database connection has been established successfully."
                        );
                    })
                    .catch((err) => {
                        console.log("Error in syncing database", err);
                        process.exit(1);
                    });
            })
            .catch((err) => {
                console.error("Unable to connect to the database:", err);
                process.exit(1);
            });
    } catch (error) {
        console.log("database connection error", error);
        process.exit(1);
    }
};

export { sequelize, connectDb };
