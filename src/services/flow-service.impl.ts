import {Execution, IFlowExecutor, IFlowExecutorFactory, IFlowService, Variables} from "../interfaces/flow-service";
import {Flow, FlowType} from "../interfaces/flow";
import {IHttpService} from "../interfaces/http-service";
import {conditionalExecutor} from "./executors/conditional-executor";
import {codeExecutor} from "./executors/code-executor";
import {httpExecutor} from "./executors/http-executor";
import {entrypoint} from "./executors/entrypoint-executor";
import {IStoreService} from "../interfaces/store-service";

export class FlowServiceImpl implements IFlowService {

    private executors: Map<FlowType, IFlowExecutor|IFlowExecutorFactory> = new Map();

    constructor(
        private httpService: IHttpService,
        private processData: IStoreService,
    ) {
        this.executors.set('CONDITIONAL', conditionalExecutor);
        this.executors.set('CODE', codeExecutor);
        this.executors.set('HTTP_REQUEST', httpExecutor(httpService));
        this.executors.set('ENTRYPOINT', entrypoint);
    }

    executeFlow(flow: Flow) {
        const persistedData = this.processData.insert(flow);
        return this.execute(persistedData, []);
    }

    execute(flow: Flow, steps: string[]): Execution {

        let nextFlow = null;

        if(this.executors.has(flow.type)){
            this.processData.update(flow.id, flow);
            nextFlow = this.executors.get(flow.type)(flow);
        }

        if(nextFlow == null) {
            return {
                id: flow.id,
                variables: flow.variables,
                startedAt: new Date(),
                nextFlow: null,
                lastFlow: flow,
                steps
            };
        }

        return this.execute({...nextFlow, variables: flow.variables}, [...steps, flow.id]);
    }

}
