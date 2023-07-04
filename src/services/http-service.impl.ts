import {HttpParams, HttpResponse, IHttpService} from "../interfaces/http-service";
import axios from "axios";

export class HttpServiceImpl implements IHttpService {
    async execute(httpParams: HttpParams): Promise<HttpResponse> {

        let body = httpParams.body;

        if(httpParams.bodyBuilder) {
            body = new Function('',`return ${httpParams.bodyBuilder}`)();
        }

        const client = axios.create({
            baseURL: httpParams.url,
            method: httpParams.method,
            headers: httpParams.headers,
            data: body
        });

        const response = await client.post('', body);

        return {
            request: httpParams,
            response: {
                status: response.status,
                headers: response.headers,
                body: response.data
            }
        };
    }

}