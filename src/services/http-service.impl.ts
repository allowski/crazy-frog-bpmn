import {HttpParams, HttpResponse, IHttpService} from "../interfaces/http-service";

export class HttpServiceImpl implements IHttpService {
    execute(httpParams: HttpParams): HttpResponse {
        return {
            request: httpParams,
            response: {
                status: 200,
                headers: {},
                body: '{"test": "1"}'
            }
        };
    }

}