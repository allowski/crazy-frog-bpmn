"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionalExecutor = void 0;
function conditionalExecutor(flow) {
    const code = new Function('variables', `return ${flow.expression}`);
    const falseOrTrue = code(flow.variables);
    return falseOrTrue ? flow.left : flow.right;
}
exports.conditionalExecutor = conditionalExecutor;
//# sourceMappingURL=conditional-executor.js.map