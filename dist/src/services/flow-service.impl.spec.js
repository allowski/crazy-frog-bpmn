"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleFlow = void 0;
const flow_service_impl_1 = require("./flow-service.impl");
const flow_service_1 = require("../interfaces/flow-service");
const http_service_impl_1 = require("./http-service.impl");
const store_service_impl_1 = require("./store-service.impl");
exports.simpleFlow = {
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
    variables: new flow_service_1.Variables()
};
const httpFlow = {
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
};
describe('FlowServiceImpl', () => {
    const httpService = new http_service_impl_1.HttpServiceImpl();
    const storage = new store_service_impl_1.StoreServiceImpl();
    const service = new flow_service_impl_1.FlowServiceImpl(httpService, storage);
    it('should execute a simple flow', () => {
        const response = service.executeFlow(exports.simpleFlow);
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
//# sourceMappingURL=flow-service.impl.spec.js.map