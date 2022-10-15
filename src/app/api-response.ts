import { Timestamp } from "rxjs";

export class ApiResponse {
    statusCode ?:number;
    status ?:string;
    message ?: string;
    data ?: any;
    errors ?: any;
}
