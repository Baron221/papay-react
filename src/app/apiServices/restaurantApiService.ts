import axios from "axios";
import { serviceApi } from "../../lib/config";
import assert from "assert";
import { Definer}  from "../../lib/Definer";
import { Restaurant } from "../../../src/app/types/user"
import { SearchObj } from "../../app/types/others";

class RestaurantApiService {
    private readonly path: string;
    constructor() {
        this.path = serviceApi;
    }

    async getTopRestaurants() {
        try {
            const url = `/restaurants?order=top&page=1&limit=4`,
                result = await axios.get(this.path + url, { withCredentials: true })
            assert.ok(result, Definer.general_err1);
            console.log('state:', result.data.state);
            const top_restaurants: Restaurant[] = result.data.data;
            return top_restaurants;
        } catch (error: any) {
            console.log(`ERROR::: getTopRestaurants ${error.message}`);
            throw error;
        }
    }
    async getRestaurants(data: SearchObj) {
        try {
            const url = `/restaurants?order=${data.order}&page=${data.page}&limit=${data.limit}`,
                result = await axios.get(this.path + url, { withCredentials: true })
            assert.ok(result, Definer.general_err1);
            console.log('state:', result.data.state);
            const restaurants: Restaurant[] = result.data.data;
            return restaurants;
        } catch (error: any) {
            console.log(`ERROR::: getRestaurants ${error.message}`);
            throw error;
        }
    };

    async getChosenRestaurants(id:string){
        try{
          const url = `/restaurants/${id}`,
           result = await axios.get(this.path + url,{ withCredentials: true });
        assert.ok(result, Definer.general_err1);
        console.log('state:', result.data.data);
        const restaurant: Restaurant[] = result.data.data;
        return restaurant
        }catch(err:any){
            console.log(`ERROR::: getChosenRestaurants ${err.message}`);
            throw err;

        }
    }
}

export default RestaurantApiService;