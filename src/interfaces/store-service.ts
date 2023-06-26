export interface IStoreService {
    insert(entry: StoredObject): StoredObject;
    update(id: string, entry: StoredObject): StoredObject;
    delete(id: string);
    findById(id: string): StoredObject;
}

export type StoredObject = any|{id: string};