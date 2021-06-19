import SessionStorage from "../utils/SessionStorage";
import AppointmentsService from "./AppointmentsService";
import UsersService from "./UsersService";

export enum ContentTypes {
    json = "JSON",
    multipart = "MULTI_PART_FORM_DATA"
}

export interface RequestOptions {
    url: string,
    method: string,
    body?: any,
    params?: any,
    headers?: Headers,
    contentType?: ContentTypes

}

export interface BaseResponse<T> {
    data: T;
}

export class ErrorResponse extends Error {
    status!: number;
    error!: string;

    constructor(status: number, error: string) {
        super(`${status} - ${error}`);
        this.status = status;
        this.error = error;
    }
}
export default class APIClient {
    private static instance: APIClient;
    private static usersService: UsersService = UsersService.getInstance();
    private static appointmentsService: AppointmentsService = AppointmentsService.getInstance();

    public static baseUrl: string = process.env.REACT_APP_API_URL || "";

    private constructor() { }

    public static getInstance(): APIClient {
        if (!APIClient.instance) {
            APIClient.instance = new APIClient();
        }

        return APIClient.instance;
    }

    private getContentType(contentType: string): string {
        switch (contentType) {
            case ContentTypes.json: return "application/json";
            case ContentTypes.multipart: return "";
            default: return "application/json";
        }
    }

    private getBody(contentType: string, body: any): any {
        if (contentType === ContentTypes.multipart) {
            const keys: string[] = Object.keys(body);
            const formData: FormData = new FormData();
            for (let i = 0; i < keys.length; i++) {
                if (body[keys[i]] instanceof Array) {
                    formData.append(keys[i], JSON.stringify(body[keys[i]]));
                }
                else {
                    formData.append(keys[i], body[keys[i]])
                }

            }
            return formData;
        }
        else {
            return JSON.stringify(body);
        }
    }

    private getHeaders(extraHeaders: Headers, contentType: string): any {
        const headers: any = { ...extraHeaders, "Authorization": "Bearer " + new SessionStorage().getToken()};
        if (contentType.trim() === "") {
            return headers;
        }
        headers['Content-Type'] = contentType;
        return headers;
    }

    public static async makeRequest<T>(options: RequestOptions): Promise<T> {

        if (options.params) {
            const keys: string[] = Object.keys(options.params);
            const filteredParams: any = {};
            for (let i = 0; i < keys.length; i++) {
                if (options.params[keys[i]]) {
                    filteredParams[keys[i]] = options.params[keys[i]];
                }
            }
            options.params = filteredParams;
        }

        const contentType: string = this.getInstance().getContentType(options.contentType || "");
        const body: any = this.getInstance().getBody(options.contentType || "", options.body);
        const request: RequestInit = {
            method: options.method,
            headers: this.getInstance().getHeaders(options.headers || new Headers(), contentType),
            body
        };
        const response: Response = await fetch(options.url + `${options.params ? '?' : ''}` + new URLSearchParams(options.params), request);
        const text: string = await response.text();
        if (response.ok && text.length > 1) {
            return JSON.parse(text) as T
        }
        else if(response.ok)
        {
            return {} as T;
        }
        throw new ErrorResponse(response.status, text);
    }


    public getUsersService(): UsersService {
        return APIClient.usersService;
    }

    public getAppointmentsService(): AppointmentsService {
        return APIClient.appointmentsService;
    }


} 