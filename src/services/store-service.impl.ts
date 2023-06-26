import {IStoreService, StoredObject} from "../interfaces/store-service";

export class StoreServiceImpl implements IStoreService{
    storage: Map<String, String> = new Map<String, StoredObject>();

    delete(id: string) {
        this.storage.delete(id);
    }

    insert(entry: StoredObject): StoredObject {
        entry.id = (new Date()).toISOString();
        this.storage.set(entry.id, entry);
        return entry;
    }

    update(id: string, entry: StoredObject): StoredObject {
        this.storage.set(id, entry);
    }

    findById(id: string): StoredObject {
        return this.storage.get(id);
    }

}