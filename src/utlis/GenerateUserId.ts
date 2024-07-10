const generateUserId = (usertype: string) => {
    return usertype + Math.floor(Math.random() * 1000000000);
};

export default generateUserId;
