import express from "express";
import {FlowServiceImpl} from "./src/services/flow-service.impl";
import {StoreServiceImpl} from "./src/services/store-service.impl";
import {HttpServiceImpl} from "./src/services/http-service.impl";
import bodyParser from "body-parser";
import {Variables} from "./src/interfaces/flow-service";

const app = express();

app.use(bodyParser());

const store = new StoreServiceImpl();
const httpService = new HttpServiceImpl();
const flowService = new FlowServiceImpl(httpService, store);

app.get('/processes/:id',
    (req, res) => store.findById(req.params['id'])
);

app.post('/processes', (req, res) => {
    const flowData = {
        ...req.body,
        variables: new Variables(req.body?.variables)
    };
    console.log(flowData);
    return flowService.executeFlow(flowData);
})

app.listen(9922);
