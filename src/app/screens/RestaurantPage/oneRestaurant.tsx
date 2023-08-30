import React, { useEffect, useRef, useState } from "react";
import { Badge, Box, Button, Checkbox, Container, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import SearchIcon from "@mui/icons-material/Search"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import StarIcon from "@mui/icons-material/Star"
import { useParams } from "react-router-dom";

//Redux
import { retrieveRandomRestaurants, retrieveChosenRestaurant, retrieveTargetProducts } from "../../screens/RestaurantPage/selector";
import { Restaurant } from "../../types/user";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setChosenRestaurant, setRandomRestaurants, setTargetProducts } from "../../screens/RestaurantPage/slice";
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
   setRandomRestaurants: (data: Restaurant[]) => dispatch(setRandomRestaurants(data)),
   setChosenRestaurant: (data: Restaurant) => dispatch(setChosenRestaurant(data)),
   setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

/** Redux Selector */
const randomRestaurantsRetriever = createSelector(
   retrieveRandomRestaurants,
   (randomRestaurants) => ({
      randomRestaurants
   })
);
const chosenRestaurantRetriever = createSelector(
   retrieveChosenRestaurant,
   (chosenRestaurant) => ({
      chosenRestaurant
   })
);

const targetProductsRetriever = createSelector(
   retrieveTargetProducts,
   (targetProducts) => ({
      targetProducts
   })
);


export function OneRestaurant(props: any) {

   /**INITIALIZATIONS */
   const history = useHistory();
   const refs: any = useRef([]);
   let { restaurant_id } = useParams<{ restaurant_id: string }>();

   const { setRandomRestaurants, setChosenRestaurant, setTargetProducts } = actionDispatch(useDispatch());
   const { randomRestaurants } = useSelector(randomRestaurantsRetriever);
   const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);
   const { targetProducts } = useSelector(targetProductsRetriever);
   const [chosenRestaurant_id, setChosenRestaurant_id] = useState<string>(restaurant_id);
   const [targetProductSearchObj, setTargetProductSearchObj] = useState<ProductSearchObject>({
      page: 1,
      limit: 8,
      order: 'createdAt',
      restaurant_mb_id: restaurant_id,
      product_collection: "dish"
   });

   const [productRebuild, setProductRebuild] = useState<Date>(new Date());

   useEffect(() => {
      const restaurantService = new RestaurantApiService();
      restaurantService.getRestaurants({
         page: 1,
         limit: 10,
         order: "random"
      }).then(data => setRandomRestaurants(data)).catch(err => console.log(err));

      restaurantService.getChosenRestaurant(chosenRestaurant_id)
         .then(data => setChosenRestaurant(data))
         .catch(err => console.log(err)
         )

      const producService = new ProductApiService();
      producService.getTargetProducts(targetProductSearchObj)
         .then((data) => setTargetProducts(data))
         .catch(err => console.log(err))
   }, [chosenRestaurant_id, targetProductSearchObj, productRebuild])

   /** HANDLERS */
   const chosenRestaurantHandler = (id: string) => {
      setChosenRestaurant_id(id);
      targetProductSearchObj.restaurant_mb_id = id;
      setTargetProductSearchObj({ ...targetProductSearchObj })
      history.push(`/restaurant/${id}`)
   }

   const searchCollectionHandler = (collection: string) => {
      targetProductSearchObj.page = 1;
      targetProductSearchObj.product_collection = collection;
      setTargetProductSearchObj({ ...targetProductSearchObj });
   }

   const searchOrderHandler = (order: string) => {
      targetProductSearchObj.page = 1;
      targetProductSearchObj.order = order;
      setTargetProductSearchObj({ ...targetProductSearchObj });
   }

   const chosenDishHandler = (id: string) => {
      history.push(`/restaurant/dish/${id}`)
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



   return <div className="single_restaurant">
      <Container>

         <Stack flexDirection={"column"} alignItems={"center"}>

            <Stack className="avatar_big_box">

               <Box className="top_text">
                  <p>{chosenRestaurant?.mb_nick} Restaurant</p>
                  <Box className="Single_search_big_box">
                     <form action="" method="" className="Single_search_form">
                        <input type="search" className="Single_searchInput" name="Single_reSearch" placeholder="Qidiruv" />
                        <Button
                           className="Single_button_search"
                           variant="contained"
                           endIcon={<SearchIcon />}
                        >
                           Izlash
                        </Button>
                     </form>
                  </Box>
               </Box>

            </Stack>

            <Stack
               style={{ width: "100%", display: "flex" }}
               flexDirection={"row"}
               sx={{ mt: "35px" }}
            >
               <Box className="prev_btn restaurant-prev">
                  <ArrowBackIosNewIcon
                     sx={{ fontSize: 40 }}
                     style={{ color: "white" }}
                  />
               </Box>
               <Swiper
                  className="restaurant_avatars_wrapper"
                  slidesPerView={7}
                  centeredSlides={false}
                  spaceBetween={30}
                  navigation={{
                     nextEl: ".restaurant-next",
                     prevEl: ".restaurant-prev"
                  }}
               >
                  {randomRestaurants.map((ele: Restaurant) => {
                     const image_path = `${serviceApi}/${ele.mb_image}`

                     return (
                        <SwiperSlide onClick={() => { chosenRestaurantHandler(ele._id) }}
                           style={{ cursor: "pointer" }}
                           key={ele._id}
                           className="restaurant_avatars"
                        >
                           <img src={image_path} />
                           <span>{ele.mb_nick}</span>
                        </SwiperSlide>
                     );
                  })}
               </Swiper>
               <Box className="next_btn restaurant-next" style={{ color: "white" }}>
                  <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
               </Box>

            </Stack>

            <Stack
               display={"flex"}
               flexDirection={"row"}
               justifyContent={"flex-end"}
               width={"90%"}
               sx={{ mt: "65px" }}
            >
               <Box className="dishes_filter_box">
                  <Button onClick={() => { searchOrderHandler("createdAt") }} color="secondary" variant="contained">new</Button>
                  <Button onClick={() => { searchOrderHandler("product_price") }} color="secondary" variant="contained">price</Button>
                  <Button onClick={() => { searchOrderHandler("product_likes") }} color="secondary" variant="contained">likes</Button>
                  <Button onClick={() => { searchOrderHandler("product_views") }} color="secondary" variant="contained">views</Button>
               </Box>
            </Stack>

            <Stack style={{ width: "100%", display: "flex", minHeight: "600px" }} >
               <Stack className="dish_category_box">
                  <div className="dish_category_main">
                     <Button onClick={() => { searchCollectionHandler("etc") }} variant="contained" color="secondary">boshqa</Button>
                     <Button onClick={() => { searchCollectionHandler("drink") }} variant="contained" color="secondary">ichimlik</Button>
                     <Button onClick={() => { searchCollectionHandler("salad") }} variant="contained" color="secondary">salad</Button>
                     <Button onClick={() => { searchCollectionHandler("dish") }} variant="contained" color="secondary">ovqatlar</Button>
                  </div>
               </Stack>
               <Stack className="dish_wrapper">
                  {targetProducts.map((product: Product) => {
                     const image_path = `${serviceApi}/${product.product_images[0]}`
                     const size_volume = product.product_collection === 'drink'
                        ? product.product_volume + 'l'
                        : product.product_size + " size"
                     return (
                        <Box onClick={() => chosenDishHandler(product._id)} className="dish_box" key={product._id}>
                           <Box className="dish_img" sx={{ backgroundImage: `url(${image_path})` }}>
                              <div className="dish_sale">{size_volume}</div>
                              <Button className="like_view_btn" style={{ left: "36px" }}>
                                 <Badge
                                    onClick={(e) => e.stopPropagation()}
                                    badgeContent={product.product_likes}
                                    color="primary"
                                 >
                                    <Checkbox
                                       onClick={targetLikeProduct}
                                       icon={<FavoriteBorder style={{ color: "white" }} />}
                                       id={product._id}
                                       checkedIcon={<Favorite style={{ color: "red" }} />}
                                       checked={product?.me_liked && product?.me_liked[0]?.my_favorite
                                          ? true
                                          : false}
                                    />
                                 </Badge>
                              </Button>
                              <Button className="view_btn"
                                 onClick={(e) => {
                                    props.onAdd(product);
                                    e.stopPropagation()
                                 }}
                              >
                                 <img src="/icons/shopping_cart.svg" alt="" style={{ display: "flex" }} />
                              </Button>
                              <Button className="like_view_btn" style={{ right: "36px" }}>
                                 <Badge badgeContent={product.product_views} color="primary">
                                    <Checkbox
                                       icon={<RemoveRedEyeIcon style={{ color: "white" }}
                                       />} />
                                 </Badge>
                              </Button>
                           </Box>
                           <Box className="dish_desc">
                              <span className="dish_title_text">{product.product_name}</span>
                              <div className="dish_desc_text">
                                 <MonetizationOnIcon /> {product.product_price}
                              </div>
                           </Box>
                        </Box>
                     )
                  })}
               </Stack>
            </Stack>

         </Stack>
      </Container>

      <div className="review_for_restaurant">
         <Container
            sx={{ mt: "100px" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
         >
            <Box className="category_title">Oshxona haqida fikrlar</Box>
            <Stack flexDirection={"row"} display={"flex"} justifyContent={"space-between"} width={"100%"}>
               {Array.from(Array(4).keys()).map((ele, index) => {
                  return (
                     <Box className="review_box" key={index}>
                        <Box display={"flex"} justifyContent={"center"}>
                           <img src="/community/communityUser.jpg" className="review_img" alt="" />
                        </Box>
                        <span className="review_name">Javokhirbek</span>
                        <span className="review_prof">Foydalanuvchi</span>
                        <p className="review_desc">I really liked the foods of this restaurants. Class! Will recommend to all guys!!</p>
                        <div className="review_stars">
                           <StarIcon style={{ color: "#f2bd57" }} />
                           <StarIcon style={{ color: "#f2bd57" }} />
                           <StarIcon style={{ color: "#f2bd57" }} />
                           <StarIcon style={{ color: "whitesmoke" }} />
                           <StarIcon style={{ color: "whitesmoke" }} />
                        </div>
                     </Box>
                  )
               })}
            </Stack>
         </Container>
      </div>

      <Container className="member_reviews">
         <Box className="category_title">Oshxona haqida</Box>
         <Stack
            display={"flex"}
            flexDirection={"row"}
            width={"90%"}
            sx={{ mt: "70px" }}
         >
            <Box className="about_left" sx={{
               backgroundImage: `url(${serviceApi}/${chosenRestaurant?.mb_image})`
            }}>
               <div className="about_left_desc">
                  <span>{chosenRestaurant?.mb_nick}</span>
                  <p>{chosenRestaurant?.mb_description}</p>
               </div>
            </Box>
            <Box className="about_right">
               {Array.from(Array(3).keys()).map((ele, index) => {
                  return (
                     <Box display={"flex"} flexDirection={"row"} key={index}>
                        <div className="about_right_img"></div>
                        <div className="about_right_desc">
                           <span>Biznig mohir oshpazlarimiz</span>
                           <p>Bizning oshpazlarimiz dunyo taniydigan oliygohlarda malaka oshirib kelishgan</p>
                        </div>
                     </Box>
                  )
               })}
            </Box>
         </Stack>

         <Stack
            sx={{ mt: "60px" }}
            style={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center"
            }}
         >
            <Box className={"category_title"}>
               Oshxona Manzili
            </Box>
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
               style={{ marginTop: "60px" }}
               width={"1320"} height={500} referrerPolicy="no-referrer-when-downgrade"></iframe>
         </Stack>
      </Container>
   </div>
}