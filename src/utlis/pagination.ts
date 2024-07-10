import { Model, FindAndCountOptions, Op, Includeable } from "sequelize";

interface PaginatedData<T> {
    records: T[];
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
}

const paginateModel = async <T extends Model>(
    model: {
        findAndCountAll(
            options?: FindAndCountOptions
        ): Promise<{ count: number; rows: T[] }>;
        rawAttributes: Record<string, unknown>;
    },
    page: number = 1,
    pageSize: number = 10,
    where: Record<string, unknown> = {},
    searchKey?: string | null,
    includeModels?: Includeable[],
    attributes?: string[],
    addSorting: boolean = true,
    sortKey: string = "createdAt",
    sortOrder: string = "DESC",
    operators?: Record<string, unknown>
): Promise<PaginatedData<T>> => {
    try {
        const offset = (page - 1) * pageSize;

        const columns = Object.keys(model.rawAttributes);

        const searchConditions = searchKey
            ? {
                  [Op.or]: columns.map((column) => ({
                      [column]: { [Op.like]: `%${searchKey}%` },
                  })),
              }
            : {};

        //operator logic
        const operation: Record<string, any> = {
            between: Op.between,
            contains: Op.contains,
        };

        const conditions = operators ?? {};

        for (let i = 0; i < Object.keys(operators ?? {}).length; i++) {
            const field = Object.keys(operators)[i];
            const condition = operators[field];
            const operatorLiteral = condition["operator"];
            const operatorValues = condition["values"];
            const operationSymbol = operation[operatorLiteral];
            conditions[field] = {
                [operationSymbol]: operatorValues,
            };
        }
        const whereCond = { ...where, ...conditions };

        //operator logic ends

        // Fetch data with pagination
        const result = await model.findAndCountAll({
            where: searchKey
                ? { ...whereCond, ...searchConditions }
                : whereCond,
            limit: pageSize,
            offset,
            distinct: true,
            include: includeModels,
            attributes: attributes,
            order: addSorting ? [[sortKey, sortOrder]] : [],
        });
        const totalPages = Math.ceil(result.count / pageSize);

        return {
            records: result.rows,
            totalPages,
            currentPage: page,
            nextPage: page >= totalPages ? null : page + 1,
            prevPage: totalPages > 0 && page >= 2 ? page - 1 : null,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default paginateModel;
