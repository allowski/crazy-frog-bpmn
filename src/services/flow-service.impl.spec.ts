import {FlowServiceImpl} from "./flow-service.impl";
import {Flow} from "../interfaces/flow";
import {Variables} from "../interfaces/flow-service";
import {HttpServiceImpl} from "./http-service.impl";
import {StoreServiceImpl} from "./store-service.impl";


export const simpleFlow: Flow = {
    flowId: '1',
    name: 'Entrypoint',
    description: 'Test',
    type: "ENTRYPOINT",
    left: {
        flowId: '2',
        name: 'End',
        type: 'CODE',
        expression: `variables.set('value', 'one'); console.log(variables)`,
        left: {
            flowId: '2.1',
            name: 'Check 1',
            type: 'CONDITIONAL',
            expression: `(variables.get('value') === 'one')`,
            left: {
                flowId: '3',
                name: 'End',
                type: 'ENDPOINT'
            }
        }
    },
    variables: new Variables()
}

const httpFlow: Flow = {
    flowId: '1',
    type: 'ENTRYPOINT',
    name: 'Http Sample',
    left: {
        flowId: '4',
        name: 'End 2',
        type: 'HTTP_REQUEST',
        params: {
            method: 'POST',
            bodyBuilder: `{"test": 1, "var1": variables.get('value')}`,
            url: 'https://httpbin.org/post',
            headers: 'Authorization: Bearer eyrerefd'
        }
    }
}

describe('FlowServiceImpl', () => {
    const httpService = new HttpServiceImpl();
    const storage = new StoreServiceImpl();
    const service = new FlowServiceImpl(httpService, storage);
    it('should execute a simple flow', () => {
        const response = service.executeFlow(simpleFlow);
        expect(response).toBeTruthy();
        expect(response.lastFlow.flowId).toBe('3');
        expect(response.variables.get('value')).toBe('one');
    });
    it('should call http service', () => {
       jest.spyOn(httpService, 'execute');
       const response = service.executeFlow(httpFlow);
       expect(httpService.execute).toBeCalled();
       expect(response.variables.get('lastResponse')).toBe('{"test": "1"}');
    });
});
