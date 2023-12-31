import {codeExecutor} from "./code-executor";
import {Variables} from "../../interfaces/flow-service";

describe('codeExecutor', function () {
    it('should execute some code', () => {
        const result = codeExecutor({
            type: undefined,
            id: 'testCodeExecution',
            name: 'Test Code Execution',
            flowId: 'sdfg',
            variables: new Variables({
                'var01': 'val1'
            }),
            expression: `
                variables.set('var01', 'val02'); 
                variables.set('var02', 'random-value');
            `,
            left: {
                type: 'CODE',
                id: null,
                flowId: null,
                name: 'Test',
                left: null
            }
        });
        expect(result.previous.variables.get('var01')).toEqual('val02');
        expect(result.previous.variables.get('var02')).toEqual('random-value');
    });

    it('should execute some code with structures', () => {
        const result = codeExecutor({
            type: undefined,
            id: 'testCodeExecution',
            name: 'Test Code Execution',
            flowId: 'sdfg',
            variables: new Variables({
                'var01': 'val1'
            }),
            expression: `
                if(variables.get('var01') === 'val1'){
                    variables.set('var01', 'val02'); 
                    variables.set('var02', 'random-value');
                }
            `,
            left: {
                type: 'CODE',
                id: null,
                flowId: null,
                name: 'Test',
                left: null
            }
        });
        expect(result.previous.variables.get('var01')).toEqual('val02');
        expect(result.previous.variables.get('var02')).toEqual('random-value');
    });
});