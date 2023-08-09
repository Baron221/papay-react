import { BoArticles } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

export interface AppRootState{
    homePage : HomePageState;
    restaurantPage:RestaurantPageState;
}

export interface HomePageState {
    topRestaurants?: Restaurant[];
    bestRestaurants?: Restaurant[];
    trendProducts?: Product[];
    bestBoArticles?: BoArticles[];
    trendBoArticles?: BoArticles[];
    newsBoArticles?: BoArticles[]
}

export interface RestaurantPageState{
    targetRestaurants:Restaurant[];
    randomRestaurants:Restaurant[];
    chosenRestaurant:Restaurant|null;
    targetProducts:Product[];
    chosenProduct:Product|null;

}