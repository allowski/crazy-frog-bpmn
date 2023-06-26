import {Flow} from "../../interfaces/flow";

export function codeExecutor(flow: Flow) {
    const code = new Function('variables', flow.expression);
    try {
        code(flow.variables);
        return {
            ...flow.left,
            previous: flow
        };
    }catch(err) {
        console.warn(flow.expression, flow.variables);
        throw err;
    }
}