"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServiceImpl = void 0;
class HttpServiceImpl {
    execute(httpParams) {
        return {
            request: httpParams,
            response: {
                status: 200,
                headers: {},
                body: '{"test": "1"}'
            }
        };
    }
}
exports.HttpServiceImpl = HttpServiceImpl;
//# sourceMappingURL=http-service.impl.js.map