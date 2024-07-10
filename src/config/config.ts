const _config = {
    port: process.env.PORT || 3000,
    dialect: process.env.dialect,
    host: process.env.db_host,
    username: process.env.db_user,
    password: process.env.db_password,
    database: process.env.database,
    db_port: process.env.db_port,
};

export const config = Object.freeze(_config);
