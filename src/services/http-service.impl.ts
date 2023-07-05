import {HttpParams, HttpResponse, IHttpService} from "../interfaces/http-service";
import axios, {AxiosRequestConfig, CreateAxiosDefaults} from "axios";
import {Variables} from "../interfaces/flow-service";

export class HttpServiceImpl implements IHttpService {
    async execute(httpParams: HttpParams, variables: Variables): Promise<HttpResponse> {

        let body = httpParams.body;

        if(httpParams.bodyBuilder) {
            body = new Function('variables',`return ${httpParams.bodyBuilder}`)(variables);
        }

        const response = await axios({
            url: httpParams.url,
            method: httpParams.method,
            headers: httpParams.headers,
            data: body
        });

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
