import { BoArticles } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

export interface AppRootState{
    homePage : HomePageState;
}

export interface HomePageState {
    topRestaurants?: Restaurant[];
    bestRestaurants?: Restaurant[];
    trendProducts?: Product[];
    bestBoArticles?: BoArticles[];
    trendBoArticles?: BoArticles[];
    newsBoArticles?: BoArticles[]
}