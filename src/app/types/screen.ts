import { BoArticles } from "./boArticle";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Restaurant } from "./user";

export interface AppRootState{
    homePage : HomePageState;
    restaurantPage:RestaurantPageState;
    ordersPage :OrdersPageState;
    communityPage:CommunityPageState;
    memberPage: MemberPageState

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

/** MEMBER PAGE */

export interface MemberPageState {
    chosenMember: Member | null;
    chosenMemberBoArticles: BoArticles[];
    chosenSingleBoArticles: BoArticles | null;
    memberFollowers: Follower[];
    memberFollowings: Following[];
}
