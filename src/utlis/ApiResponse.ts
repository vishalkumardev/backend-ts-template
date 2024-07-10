interface Response {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    errors?: any;
}

class ApiResponse implements Response {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    errors: string[];

    constructor(
        statusCode: number,
        success: boolean = true,
        message: string = "Success",
        data: any = {},
        errors = []
    ) {
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
}

export default ApiResponse;
