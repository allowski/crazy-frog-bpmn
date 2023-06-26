"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flow_service_impl_1 = require("./src/services/flow-service.impl");
const store_service_impl_1 = require("./src/services/store-service.impl");
const http_service_impl_1 = require("./src/services/http-service.impl");
const body_parser_1 = __importDefault(require("body-parser"));
const flow_service_1 = require("./src/interfaces/flow-service");
const app = (0, express_1.default)();
app.use((0, body_parser_1.default)());
const store = new store_service_impl_1.StoreServiceImpl();
const httpService = new http_service_impl_1.HttpServiceImpl();
const flowService = new flow_service_impl_1.FlowServiceImpl(httpService, store);
app.get('/processes/:id', (req, res) => store.findById(req.params['id']));
app.post('/processes', (req, res) => {
    var _a;
    const flowData = Object.assign(Object.assign({}, req.body), { variables: new flow_service_1.Variables((_a = req.body) === null || _a === void 0 ? void 0 : _a.variables) });
    console.log(flowData);
    return flowService.executeFlow(flowData);
});
app.listen(9922);
//# sourceMappingURL=index.js.map