import {Flow} from "../../interfaces/flow";
import {Variables} from "../../interfaces/flow-service";

export function entrypoint(flow: Flow) {
    if(flow.variables == null) flow.variables = new Variables();
    return flow.left;
}