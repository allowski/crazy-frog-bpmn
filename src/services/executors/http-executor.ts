import {HttpServiceImpl} from "../http-service.impl";
import {Flow} from "../../interfaces/flow";
import {HttpParams, IHttpService} from "../../interfaces/http-service";

export function httpExecutor(httpService: IHttpService) {
    return async (flow: Flow) => {
        const params: HttpParams = flow.params as HttpParams;
        const fn = new Function('variables', `return ${params.bodyBuilder}`);
        params.body = JSON.stringify(fn(flow.variables));
        try {
            const response = await httpService.execute(params, flow.variables);
            flow.variables.set('lastResponse', response.response.body);
            flow.variables.set('lastResponseStatus', response.response.status);
            return flow.left;
        }catch (err) {
            flow.variables.set('lastResponse', err.response.body);
            flow.variables.set('lastResponseStatus', err.response.status);
            return flow.right;
        }
    }
}
