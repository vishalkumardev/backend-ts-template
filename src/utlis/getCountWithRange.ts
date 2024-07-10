const { findDateRange } = require("./findDate");
import { CountOptions, Op } from "sequelize";

const getCount = async (
    model: {
        count(options?: CountOptions): Promise<{ count: number }>;
        rawAttributes: Record<string, unknown>;
    },
    time: string,
    filter = {}
) => {
    const date = findDateRange(time);
    const count = await model.count({
        where: {
            createdAt: {
                [Op.between]: [date.startDate, date.endDate],
            },
            ...filter,
        },
    });

    return count;
};
module.exports = { getCount };
