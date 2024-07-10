const moment = require("moment");

const formateDate = (value: string) => {
    return moment(value).format("DD-MM-YYYY");
};

export default formateDate;
