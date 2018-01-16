import { AsyncStorage } from 'react-native';
import { STORAGE_KEYS } from '../constants'

class StorageService {
    async getProducts() {
        try {
            // await AsyncStorage.removeItem(STORAGE_KEYS.PRODUCTS);
            return JSON.parse(await AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
        } catch (error) {
            console.log(error);
        }

        return [];
    }

    async setProducts(products) {
        try {
            AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }
}

export default new StorageService();
