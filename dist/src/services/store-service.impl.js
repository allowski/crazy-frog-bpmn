"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreServiceImpl = void 0;
class StoreServiceImpl {
    constructor() {
        this.storage = new Map();
    }
    delete(id) {
        this.storage.delete(id);
    }
    insert(entry) {
        entry.id = (new Date()).toISOString();
        this.storage.set(entry.id, entry);
        return entry;
    }
    update(id, entry) {
        this.storage.set(id, entry);
    }
    findById(id) {
        return this.storage.get(id);
    }
}
exports.StoreServiceImpl = StoreServiceImpl;
//# sourceMappingURL=store-service.impl.js.map