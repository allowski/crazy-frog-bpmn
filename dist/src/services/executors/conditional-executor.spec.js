"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conditional_executor_1 = require("./conditional-executor");
const flow_service_1 = require("../../interfaces/flow-service");
describe('conditionalExecutor', function () {
    const leftFlow = {
        type: undefined,
        id: 'ID_LEFT',
        flowId: 'FLOW_ID_LEFT',
        name: 'Left flow',
        description: ''
    };
    const rightFlow = {
        type: undefined,
        id: 'ID_RIGHT',
        flowId: 'FLOW_ID_RIGHT',
        name: 'Right flow',
        description: ''
    };
    it('should go left when true expression', () => {
        const result = (0, conditional_executor_1.conditionalExecutor)({
            flowId: "",
            type: undefined,
            id: 'TestID',
            name: 'Test Left Conditional',
            variables: new flow_service_1.Variables({
                'checkLogin': 1
            }),
            expression: `(variables.get('checkLogin') === 1)`,
            left: leftFlow,
            right: rightFlow
        });
        expect(result.id).toEqual('ID_LEFT');
    });
    it('should go right when false expression is given', () => {
        const result = (0, conditional_executor_1.conditionalExecutor)({
            flowId: "",
            type: undefined,
            id: 'TestID',
            name: 'Test Left Conditional',
            variables: new flow_service_1.Variables({
                'checkLogin': 1
            }),
            expression: `(variables.get('checkLogin') > 1)`,
            left: leftFlow,
            right: rightFlow
        });
        expect(result.id).toEqual('ID_RIGHT');
    });
});
//# sourceMappingURL=conditional-executor.spec.js.map