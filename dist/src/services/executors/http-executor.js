"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpExecutor = void 0;
function httpExecutor(httpService) {
    return (flow) => {
        const params = flow.params;
        const fn = new Function('variables', `return ${params.bodyBuilder}`);
        params.body = JSON.stringify(fn(flow.variables));
        const response = httpService.execute(params);
        flow.variables.set('lastResponse', response.response.body);
        return flow.left;
    };
}
exports.httpExecutor = httpExecutor;
//# sourceMappingURL=http-executor.js.map