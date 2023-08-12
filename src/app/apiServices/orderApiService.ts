import { serviceApi } from "../../lib/config";
import assert from "assert";
import axios from "axios";
import { Definer } from "../../lib/Definer";
import { Restaurant } from "../types/user"
import { CartItem, ProductSearchObject } from "../types/others";
import { Product } from "../types/product";


class OrderApiService {
    private readonly path: string;
    constructor() {
        this.path = serviceApi;
    }

    async createOrder(data: CartItem[]) {
        try {
            const url = `/orders/create`,
                result = await axios.post(this.path + url, data, { withCredentials: true })

            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != 'fail', result?.data?.message);

            const order: any = result.data.data;
            console.log("order::", order);
            return true;


        } catch (error: any) {
            console.log(`createOrder, ERROR ${error.message}`);
            throw error;
        }
    }
}

export default OrderApiService;

