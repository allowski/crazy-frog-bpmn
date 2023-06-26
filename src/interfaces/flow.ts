import {Variables} from "./flow-service";
import {HttpParams} from "./http-service";

export type FlowType = 'CONDITIONAL' | 'HTTP_HANDLER' | 'QUEUE_LISTENER' | 'ENTRYPOINT' | 'ENDPOINT' | 'CODE' | 'HTTP_REQUEST';

export interface Flow {
    flowId: string;
    id?: any;
    name: string;
    description?: string;
    type: FlowType;
    left?: Flow;
    right?: Flow;
    previous?: Flow;
    variables?: Variables;
    expression?: string;
    params?: {[key: string]: any} | HttpParams;
}

export interface Choreography {
    id: string;
    left?: Choreography;
    right?: Choreography;
}

export const dance1 = {
    id: '1',
    left: {
        id: '2'
    }
}