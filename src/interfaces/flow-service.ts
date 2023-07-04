import {Flow} from "./flow";

export interface IFlowService {
    executeFlow(flow: Flow): Promise<Execution>;
    execute(flow: Flow, steps: string[]): Promise<Execution>;
}

export interface IFlowService {
    execute(flow: Flow, steps: string[]): Promise<Execution> | Flow
}

export type IFlowExecutor = (flow: Flow) => Promise<Flow> | Flow;
export type IFlowExecutorFactory = () => IFlowExecutor;

export interface Execution {
    id: string;
    startedAt: Date;
    nextFlow: Flow;
    variables: Variables;
    lastFlow?: Flow;
    steps: string[]
}

export class Variables {
    private variables: Map<String, any> = new Map();
    constructor(init?: {[key: string]: any}) {
        if(init) {
            this.variables = new Map();
            Object.keys(init).forEach((key) => {
               this.variables.set(key, init[key]);
            });
        }
    }
    set(key: string, value: any) {
        this.variables.set(key, value);
    }

    get(key: string): any {
        return this.variables.get(key);
    }

    remove(key: string): any{
        return this.variables.delete(key);
    }

}