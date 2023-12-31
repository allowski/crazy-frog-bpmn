import {Flow} from "../../interfaces/flow";
import {conditionalExecutor} from "./conditional-executor";
import {Variables} from "../../interfaces/flow-service";

describe('conditionalExecutor', function () {
    const leftFlow: Flow = {
        type: undefined,
        id: 'ID_LEFT',
        flowId: 'FLOW_ID_LEFT',
        name: 'Left flow',
        description: ''
    };
    const rightFlow: Flow = {
        type: undefined,
        id: 'ID_RIGHT',
        flowId: 'FLOW_ID_RIGHT',
        name: 'Right flow',
        description: ''
    };
    it('should go left when true expression', () => {
        const result = conditionalExecutor({
            flowId: "",
            type: undefined,
            id: 'TestID',
            name: 'Test Left Conditional',
            variables: new Variables({
                'checkLogin': 1
            }),
            expression: `(variables.get('checkLogin') === 1)`,
            left: leftFlow,
            right: rightFlow
        });

        expect(result.id).toEqual('ID_LEFT');

    });

    it('should go right when false expression is given', () => {
        const result = conditionalExecutor({
            flowId: "",
            type: undefined,
            id: 'TestID',
            name: 'Test Left Conditional',
            variables: new Variables({
                'checkLogin': 1
            }),
            expression: `(variables.get('checkLogin') > 1)`,
            left: leftFlow,
            right: rightFlow
        });

        expect(result.id).toEqual('ID_RIGHT');

    });
});