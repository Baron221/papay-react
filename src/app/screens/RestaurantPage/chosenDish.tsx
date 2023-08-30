import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Checkbox, Container, Rating, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react'
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import Marginer from "../../components/marginer";
import { useParams } from "react-router-dom";

//Redux
import { retrieveRandomRestaurants, retrieveChosenRestaurant, retrieveTargetProducts, retrieveChosenProduct } from "../../screens/RestaurantPage/selector";
import { Restaurant } from "../../types/user";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setChosenRestaurant, setChosenProduct } from "../../screens/RestaurantPage/slice";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { ProductSearchObject, SearchObj } from "../../types/others";
import { serviceApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../types/product";
import { verifiedMemberData } from "../../apiServices/verify";

/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
   setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
   setChosenRestaurant: (data: Restaurant) => dispatch(setChosenRestaurant(data)),
});

/** Redux Selector */
const chosenProductRetriever = createSelector(
   retrieveChosenProduct,
   (chosenProduct) => ({
      chosenProduct
   })
);

const chosenRestaurantRetriever = createSelector(
   retrieveChosenRestaurant,
   (chosenRestaurant) => ({
      chosenRestaurant
   })
);
const chosen_list = Array.from(Array(5).keys());

export function ChosenDish(props: any) {
   /** INITIALIZATIONS */
   const { setChosenProduct, setChosenRestaurant } = actionDispatch(useDispatch());
   const { chosenProduct } = useSelector(chosenProductRetriever);
   const { chosenRestaurant } = useSelector(chosenRestaurantRetriever)
   const [productRebuild, setProductRebuild] = useState<Date>(new Date());

   let { dish_id } = useParams<{ dish_id: string }>();
   const label = { inputProps: { "aria-label": "Checkbox demo" } }


   const dishRelatedProcess = async () => {
      try {
         const productService = new ProductApiService();
         const product: Product = await productService.getChosenDish(dish_id);
         setChosenProduct(product);

         const restaurantService = new RestaurantApiService();
         const restaurant: Restaurant = await restaurantService.getChosenRestaurant(product.restaurant_mb_id);
         setChosenRestaurant(restaurant);
      } catch (error) {
         console.log(`dishRelatedProcess, ERROR:`, error);

      }
   }

   const targetLikeProduct = async (e: any) => {
      try {
         assert.ok(verifiedMemberData, Definer.auth_err1);

         const memberService = new MemberApiService(),
            like_result: any = await memberService.memberLikeTarget({
               like_ref_id: e.target.id,
               group_type: "product"
            });
         assert.ok(like_result, Definer.general_err1);

         await sweetTopSmallSuccessAlert("success", 700, false);
         setProductRebuild(new Date);
      } catch (err: any) {
         console.log("targetLikeProduct, ERROR:", err);
         sweetErrorHandling(err).then();
      }
   };


   useEffect(() => {
      dishRelatedProcess().then()
   }, [productRebuild])

   return <div className="chosen_dish_page">
      <Container className="dish_container">
         <Stack className="chosen_dish_slider">
            <Swiper
               className="dish_swiper"
               loop={true}
               spaceBetween={10}
               navigation={true}
               modules={[FreeMode, Navigation, Thumbs]}
            >
               {chosenProduct?.product_images.map((ele) => {
                  const img_path = `${serviceApi}/${ele}`
                  return (
                     <SwiperSlide>
                        <img src={img_path} style={{ width: "100%", height: "100%" }} alt="" />
                     </SwiperSlide>
                  )
               })}
            </Swiper>

            <Swiper
               loop={true}
               spaceBetween={20}
               slidesPerView={chosenProduct?.product_images.length}
               freeMode={true}
               watchSlidesProgress={true}
               modules={[FreeMode, Navigation, Thumbs]}
               className="mySwiper"
               style={{ width: "500px", height: "245px", marginTop: "20px" }}
            >
               {chosenProduct?.product_images.map((ele) => {
                  const img_path = `${serviceApi}/${ele}`
                  return (
                     <SwiperSlide style={{ height: "107px", display: "flex" }}>
                        <img src={img_path} style={{ borderRadius: "15px" }} alt="" />
                     </SwiperSlide>
                  )
               })}
            </Swiper>

         </Stack>
         <Stack className="chosen_dish_info_container">
            <Box className="chosen_dish_info_box">
               <strong className="dish_txt">{chosenProduct?.product_name}</strong>
               <span className="resto_name">{chosenRestaurant?.mb_nick}</span>
               <Box className="rating_box">
                  <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
                  <div className="evaluation_box">
                     <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
                        <Checkbox
                           {...label}
                           icon={<FavoriteBorder />}
                           checkedIcon={<Favorite style={{ color: "red" }} />}
                           id={chosenProduct?._id}
                           onClick={targetLikeProduct}
                           checked={chosenProduct?.me_liked && !!chosenProduct.me_liked[0]?.my_favorite}
                        />
                        <span>{chosenProduct?.product_likes}ta</span>
                     </div>
                     <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
                        <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                        <span>{chosenProduct?.product_views}ta</span>
                     </div>
                  </div>
               </Box>
               <p className="dish_desc_info">{chosenProduct?.product_description ? chosenProduct?.product_description : "no description"}</p>
               <Marginer
                  direction="horizontal"
                  height="1"
                  width="100%"
                  bg="#000000"
               />
               <div className="dish_price_box">
                  <span>Narx:</span>
                  <span>$11</span>
               </div>
               <div className="button_box">
                  <Button onClick={() => { props.onAdd(chosenProduct) }} variant="contained">Savatga qo'shish</Button>
               </div>
            </Box>
         </Stack>
      </Container>
   </div>
}

