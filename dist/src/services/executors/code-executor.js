"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeExecutor = void 0;
function codeExecutor(flow) {
    const code = new Function('variables', flow.expression);
    try {
        code(flow.variables);
        return Object.assign(Object.assign({}, flow.left), { previous: flow });
    }
    catch (err) {
        console.warn(flow.expression, flow.variables);
        throw err;
    }
}
exports.codeExecutor = codeExecutor;
//# sourceMappingURL=code-executor.js.map