import {HttpServiceImpl} from "../http-service.impl";
import {Flow} from "../../interfaces/flow";
import {HttpParams} from "../../interfaces/http-service";

export function httpExecutor(httpService: HttpServiceImpl) {
    return (flow: Flow) => {
        const params: HttpParams = flow.params as HttpParams;
        const fn = new Function('variables', `return ${params.bodyBuilder}`);
        params.body = JSON.stringify(fn(flow.variables));
        const response = httpService.execute(params);
        flow.variables.set('lastResponse', response.response.body);
        return flow.left;
    }
}