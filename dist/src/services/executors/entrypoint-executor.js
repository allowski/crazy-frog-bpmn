"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entrypoint = void 0;
const flow_service_1 = require("../../interfaces/flow-service");
function entrypoint(flow) {
    if (flow.variables == null)
        flow.variables = new flow_service_1.Variables();
    return flow.left;
}
exports.entrypoint = entrypoint;
//# sourceMappingURL=entrypoint-executor.js.map