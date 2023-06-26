"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variables = void 0;
class Variables {
    constructor(init) {
        this.variables = new Map();
        if (init) {
            this.variables = new Map();
            Object.keys(init).forEach((key) => {
                this.variables.set(key, init[key]);
            });
        }
    }
    set(key, value) {
        this.variables.set(key, value);
    }
    get(key) {
        return this.variables.get(key);
    }
    remove(key) {
        return this.variables.delete(key);
    }
}
exports.Variables = Variables;
//# sourceMappingURL=flow-service.js.map