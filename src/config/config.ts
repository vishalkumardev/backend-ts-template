const _config = {
    port: process.env.PORT || 3000,
    uri: process.env.uri,
};

export const config = Object.freeze(_config);
