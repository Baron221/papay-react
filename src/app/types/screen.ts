import { BoArticles } from "./boArticle";
import { Order } from "./order";
import { Product } from "./product";
import { Restaurant } from "./user";

export interface AppRootState{
    homePage : HomePageState;
    restaurantPage:RestaurantPageState;
    ordersPage :OrdersPageState;
    communityPage:CommunityPageState;
}

export interface HomePageState {
    topRestaurants?: Restaurant[];
    bestRestaurants?: Restaurant[];
    trendProducts?: Product[];
    bestBoArticles?: BoArticles[];
    trendBoArticles?: BoArticles[];
    newsBoArticles?: BoArticles[]
}

/**Restaurant page */
export interface RestaurantPageState{
    targetRestaurants:Restaurant[];
    randomRestaurants:Restaurant[];
    chosenRestaurant:Restaurant|null;
    targetProducts:Product[];
    chosenProduct:Product|null;

}

/**Orders Page */
export interface OrdersPageState {
    pausedOrders :Order[],
    processOrders:Order[],
    finishedOrders:Order[]
}

/**Community Page */

export interface CommunityPageState {
    targetBoArticles:BoArticles[];

}