import {httpExecutor} from "./http-executor";
import {HttpParams, HttpResponse, IHttpService} from "../../interfaces/http-service";
import {Variables} from "../../interfaces/flow-service";
import {jest} from "@jest/globals";
import {Flow} from "../../interfaces/flow";

describe('HttpExecutor', () => {
    const mockedResponse = '{"test": "response"}';
    const httpServiceFactory = (responseText: string, statusCode: number) => ({
        async execute(httpParams: HttpParams, variables: Variables): Promise<HttpResponse> {
            return new Promise((resolve, reject) => {
                (statusCode >= 300 ? reject : resolve)({
                    request: undefined, response: {body: responseText, headers: {}, status: statusCode},
                });
            });
        }
    });

    const flow: Flow = {
        type: undefined,
        name: 'TestFlow',
        variables: new Variables(),
        id: '1234',
        flowId: '1234',
        description: 'TestHttpFlow',
        params: {
            url: "http://www.somewhere.com/v1/test",
            body: "",
            headers: {
                "test": "value"
            }
        },
        left: {
            type: 'ENDPOINT',
            name: 'Endpoint',
            id: 'leftID',
            flowId: '2341'
        },
        right: {
            type: 'ENDPOINT',
            name: 'RightEndpoint',
            id: 'rightID',
            flowId: '2342'
        }
    };

    it('should make a request to a dummy server', async() => {
        const httpServiceImpl = httpServiceFactory(mockedResponse, 200);
        const executor = httpExecutor(httpServiceImpl);
        jest.spyOn(httpServiceImpl, 'execute');
        const response = await executor(flow);
        expect(httpServiceImpl.execute).toBeCalled();
        expect(flow.variables.get('lastResponse')).toBe(mockedResponse);
        expect(flow.variables.get('lastResponseStatus')).toBe(200);
        expect(response.id).toBe('leftID');
    });

    it('should make a failed request to a dummy server', async() => {
        const httpServiceImpl = httpServiceFactory(mockedResponse, 500);
        const executor = httpExecutor(httpServiceImpl);
        jest.spyOn(httpServiceImpl, 'execute');
        const response = await executor(flow);
        expect(httpServiceImpl.execute).toBeCalled();
        expect(flow.variables.get('lastResponse')).toBe(mockedResponse);
        expect(flow.variables.get('lastResponseStatus')).toBe(500);
        expect(response.id).toBe('rightID');
    });

    it('should make a request using bodybuilder function to a dummy server', async() => {
        const httpServiceImpl = httpServiceFactory(mockedResponse, 200);
        const executor = httpExecutor(httpServiceImpl);
        const currentFlow = {
            ...flow,
            variables: new Variables({
                'test': 10,
                'number': 20
            }),
            params: {
                ...flow.params,
                bodyBuilder: `{"number": variables.get('test') * variables.get('number')}`,
            }
        };
        jest.spyOn(httpServiceImpl, 'execute');
        const response = await executor(currentFlow);
        expect(httpServiceImpl.execute).toBeCalled();
        expect(currentFlow.variables.get('lastResponse')).toBe(mockedResponse);
        expect(currentFlow.variables.get('lastResponseStatus')).toBe(200);
        expect(response.id).toBe('leftID');
    });

});
