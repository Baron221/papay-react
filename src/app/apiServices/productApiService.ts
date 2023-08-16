import axios from "axios";
import { serviceApi } from "../../lib/config";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { Restaurant } from "../../app/types/user"
import { ProductSearchObject } from "../../app/types/others";
import { Product } from "../../app/types/product";




class ProductApiService {
    private readonly path: string;
    constructor() {
        this.path = serviceApi;
    }

    async getTargetProducts(data: ProductSearchObject) {
        try {
            const url = `/products`,
                result = await axios.post(this.path + url, data, { withCredentials: true })
            assert.ok(result, Definer.general_err1);
            console.log('state:', result.data.state);
            const products: Product[] = result.data.data;
            return products;
        } catch (error: any) {
            console.log(`ERROR::: getTargetProducts ${error.message}`);
            throw error;
        }
    }

    async getChosenDish(dish_id: string) {
        try {
            const url = `/products/${dish_id}`,
                result = await axios.get(this.path + url, { withCredentials: true })
            assert.ok(result, Definer.general_err1);
            console.log('state:', result.data.state);
            const product: Product = result.data.data;
            return product;
        } catch (error: any) {
            console.log(`ERROR::: getChosenDish ${error.message}`);
            throw error;
        }
    }
}

export default ProductApiService;