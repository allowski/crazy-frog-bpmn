import {StoreServiceImpl} from "./store-service.impl";

describe('StoreServiceImpl', () => {
   let service: StoreServiceImpl = new StoreServiceImpl();
   it('should create instance', () => {
      expect(service).toBeTruthy();
   });

    it('should store object successfully', () => {
        const inserted = service.insert({name: 'Name'});
        expect(inserted.id).toBeTruthy();
    });

    it('should retrieve inserted item', () => {
        const inserted = service.insert({name: 'Name'});
        const retrievedItem = service.findById(inserted.id);
        expect(retrievedItem).toBeTruthy();
        expect(retrievedItem.name).toBe('Name');
    });

    it('should update inserted item', () => {
        const inserted = service.insert({name: 'Name'});
        const retrievedItem = service.findById(inserted.id);
        retrievedItem.name = 'Updated Name';
        expect(retrievedItem).toBeTruthy();
        expect(retrievedItem.name).toBe('Updated Name');
    });

});