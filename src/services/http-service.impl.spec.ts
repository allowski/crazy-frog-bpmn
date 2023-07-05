import {HttpServiceImpl} from "./http-service.impl";
import {Variables} from "../interfaces/flow-service";

describe('HttpServiceImpl', () => {
    let httpServiceImpl = new HttpServiceImpl();
    it('should call axios with the correct params', async () => {
        const result = await httpServiceImpl.execute({
            method: 'POST',
            body: JSON.stringify({
                "test": 1
            }),
            headers: {
                'Authorization': 'Test'
            },
            url: 'https://webhook.site/2364943d-c9aa-418a-b325-c40f04f71682'
        }, new Variables());
        expect(result.response.status).toEqual(200)
    });
});
