"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowServiceImpl = void 0;
const conditional_executor_1 = require("./executors/conditional-executor");
const code_executor_1 = require("./executors/code-executor");
const http_executor_1 = require("./executors/http-executor");
const entrypoint_executor_1 = require("./executors/entrypoint-executor");
class FlowServiceImpl {
    constructor(httpService, processData) {
        this.httpService = httpService;
        this.processData = processData;
        this.executors = new Map();
        this.executors.set('CONDITIONAL', conditional_executor_1.conditionalExecutor);
        this.executors.set('CODE', code_executor_1.codeExecutor);
        this.executors.set('HTTP_REQUEST', (0, http_executor_1.httpExecutor)(httpService));
        this.executors.set('ENTRYPOINT', entrypoint_executor_1.entrypoint);
    }
    executeFlow(flow) {
        const persistedData = this.processData.insert(flow);
        return this.execute(persistedData, []);
    }
    execute(flow, steps) {
        let nextFlow = null;
        if (this.executors.has(flow.type)) {
            this.processData.update(flow.id, flow);
            nextFlow = this.executors.get(flow.type)(flow);
        }
        if (nextFlow == null) {
            return {
                id: flow.id,
                variables: flow.variables,
                startedAt: new Date(),
                nextFlow: null,
                lastFlow: flow,
                steps
            };
        }
        return this.execute(Object.assign(Object.assign({}, nextFlow), { variables: flow.variables }), [...steps, flow.id]);
    }
}
exports.FlowServiceImpl = FlowServiceImpl;
//# sourceMappingURL=flow-service.impl.js.map