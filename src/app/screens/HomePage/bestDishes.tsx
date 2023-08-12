import { Box, Container, Stack } from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import React, { useEffect } from "react";


//Redux 
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTrendProducts } from "../../screens/HomePage/slice";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveTrendProducts } from "./selector";
import { serviceApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";



/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
    setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data))
});

/** Redux Selector */
const trendProductsRetriever = createSelector(
    retrieveTrendProducts,
    (trendProducts) => ({
        trendProducts
    })
);


export function BestDishes() {
    const history = useHistory()
    /**INITIALIZATIONS */
    const { setTrendProducts } = actionDispatch(useDispatch());
    const { trendProducts } = useSelector(trendProductsRetriever)

    useEffect(() => {
        const productService = new ProductApiService();
        productService.getTargetProducts({ order: "product_likes", page: 1, limit: 4 })
            .then((data => { setTrendProducts(data) }))
            .catch(err => console.log(err))
    }, []);


    /*HANDLERS*/

    const chosenDishHandler = (id:string) => {
        history.push(`/restaurant/dish/${id}`)
    }
    return <div className="best_dishes_frame">
        <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Box className="category_title">Trenddagi ovqatlar</Box>
                <Stack sx={{ mt: "43px" }} flexDirection={"row"} >

                    {trendProducts?.map((product: Product) => {
                        const image_path = `${serviceApi}/${product.product_images[0]}`
                        const size_volume = product.product_collection === 'drink'
                            ? product.product_volume + "l"
                            : product.product_size + " size"
                        return (
                            <Box className="dish_box">
                                <Stack className="dish_image"
                                    sx={{ backgroundImage: `url(${image_path})` }}>
                                    <div className="dish_sale">
                                        {size_volume}
                                    </div>
                                    <div className="view_btn">
                                        <div onClick={() => chosenDishHandler(product._id) }>Batafsil ko'rish</div>
                                        <img src={"icons/arrow_right.svg"} alt="" style={{ marginLeft: "9px" }} />
                                    </div>
                                </Stack>
                                <Stack className="dish_desc">
                                    <span className="dish_title_text">{product.product_name}</span>
                                    <span className="dish_desc_text">
                                        <MonetizationOnIcon />
                                        {product.product_price}
                                    </span>
                                </Stack>
                            </Box>
                        )   
                    })}

                </Stack>
            </Stack>
        </Container>
    </div>
}