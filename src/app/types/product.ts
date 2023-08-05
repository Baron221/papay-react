export interface MeLiked {
    mb_id : string;
    like_ref_id: string;
    my_favorite: boolean;
}

export interface Product {
    _id : string;
    product_name: string;
    product_collection: string;
    product_status: string;
    product_price: number;
    product_discount: number;
    product_left_count: number;
    product_size: string;
    product_volume:string;
    product_description: string;
    product_images: string[];
    product_likes: number;
    product_views: number;
    restaurant_mb_id: string;
    created_at: Date;
    updatedAt: Date;
    mb_liked: MeLiked[];
}

