import {Flow} from "../../interfaces/flow";

export function conditionalExecutor(flow: Flow) {
    const code = new Function('variables', `return ${flow.expression}`);
    const falseOrTrue = code(flow.variables);
    return falseOrTrue ? flow.left : flow.right;
}