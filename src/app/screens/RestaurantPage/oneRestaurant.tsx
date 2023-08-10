import React, { useRef, useState, useEffect } from "react";
import { Badge, Box, Button, Checkbox, Container, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { Swiper, SwiperSlide } from "swiper/react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";

/**Redux */
import {
  retrieveChosenRestaurants,
  retrieveRandomRestaurants,
  retrieveTargetProducts,
  retrieveTargetRestaurants,
} from "../../screens/RestaurantPage/selector";
import { Restaurant } from "../../types/user";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  setChosenRestaurants,
  setTargetRestaurants,
  setTargetProducts,
  setRandomRestaurants,
} from "../../screens/RestaurantPage/slice";
import { Product } from "../../types/product";
import { ProductSearchObject, SearchObj } from "../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import { serviceApi } from "../../../lib/config";

/**REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) =>
    dispatch(setTargetRestaurants(data)),
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurants(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

/**REDUX SELECTOR */

const randomRestaurantsRetriever = createSelector(
  retrieveRandomRestaurants,
  (randomRestaurants) => ({
    randomRestaurants,
  })
);
const chosenRestaurantsRetriever = createSelector(
  retrieveChosenRestaurants,
  (chosenRestaurant) => ({
    chosenRestaurant,
  })
);

const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

export function OneRestaurant() {
  /**INIT */

  let { restaurant_id } = useParams<{ restaurant_id: string }>();
  const { setRandomRestaurants, setChosenRestaurant, setTargetProducts } =
    actionDispatch(useDispatch());
  const { randomRestaurants } = useSelector(randomRestaurantsRetriever);
  const { chosenRestaurant } = useSelector(chosenRestaurantsRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  const [chosenRestaurantId, setChosenRestaurantId] =
    useState<string>(restaurant_id);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObject>({
      page: 1,
      limit: 8,
      order: "createdAt",
      restaurant_mb_id: restaurant_id,
      product_collection: "dish",
    });

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [targetProductSearchObj]);

  const refs: any = useRef([]);

  /*HANDLERS*/
  return (
    <div className="single_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar_big_box">
            <Box className="top_text">
              <p>Texas De Brazil Restaurant</p>
              <Box className="Single_search_big_box">
                <form action="" method="" className="Single_search_form">
                  <input
                    type="search"
                    className="Single_searchInput"
                    name="Single_reSearch"
                    placeholder="Qidiruv"
                  />
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
                prevEl: ".restaurant-prev",
              }}
            >
              {/* {restaurants_list.map((ele, index) => {
                return (
                  <SwiperSlide
                    style={{ cursor: "pointer" }}
                    key={index}
                    className="restaurant_avatars"
                  >
                    <img src="/restaurant/burak.png" alt="" />
                    <span>Burak</span>
                  </SwiperSlide>
                );
              })} */}
            </Swiper>
            <Box
              className="next_btn restaurant-next"
              style={{ color: "white" }}
            >
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
              <Button color="secondary" variant="contained">
                new
              </Button>
              <Button color="secondary" variant="contained">
                price
              </Button>
              <Button color="secondary" variant="contained">
                likes
              </Button>
              <Button color="secondary" variant="contained">
                views
              </Button>
            </Box>
          </Stack>

          <Stack style={{ width: "100%", display: "flex", minHeight: "600px" }}>
            <Stack className="dish_category_box">
              <div className="dish_category_main">
                <Button variant="contained" color="secondary">
                  boshqa
                </Button>
                <Button variant="contained" color="secondary">
                  ichimlik
                </Button>
                <Button variant="contained" color="secondary">
                  salad
                </Button>
                <Button variant="contained" color="secondary">
                  ovqatlar
                </Button>
              </div>
            </Stack>
            <Stack className="dish_wrapper">
              {targetProducts.map((product: Product, index) => {
                const image_path = `${serviceApi}/${product.product_images[0]} `;
                const size_volume =
                  product.product_collection === "drink"
                    ? product.product_volume + "l"
                    : product.product_size + "size";
                return (
                  <Box className={"dish_box"} key={product._id}>
                    <Box
                      className={"dish_img"}
                      sx={{
                        backgroundImage: `url(${image_path})`,
                      }}
                    >
                      <div className="dish_sale">{size_volume}</div>
                      <Button
                        className="like_view_btn"
                        style={{ left: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_likes}
                          color="primary"
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            /*@ts-ignore*/
                            checked={
                              product?.me_liked &&
                              product?.me_liked[0]?.my_favourite
                                ? true
                                : false
                            }
                          />
                        </Badge>
                      </Button>
                      <Button className="view_btn">
                        <img
                          src="/icons/shopping_cart.svg"
                          alt=""
                          style={{ display: "flex" }}
                        />
                      </Button>
                      <Button
                        className="like_view_btn"
                        style={{ right: "36px" }}
                      >
                        <Badge badgeContent={product.product_views} color="primary">
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "white" }} />
                            }
                          />
                        </Badge>
                      </Button>
                    </Box>
                    <Box className="dish_desc">
                      <span className="dish_title_text">
                        {product.product_name}
                      </span>
                      <div className="dish_desc_text">
                        <MonetizationOnIcon /> {product.product_price}
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <div className="review_for_restaurant">
        <Container
          sx={{ mt: "100px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className="category_title">Oshxona haqida fikrlar</Box>
          <Stack
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {Array.from(Array(4).keys()).map((ele, index) => {
              return (
                <Box className="review_box" key={index}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img
                      src="/restaurant/bestres.png"
                      className="review_img"
                      alt=""
                    />
                  </Box>
                  <span className="review_name">Baron</span>
                  <span className="review_prof">Foydalanuvchi</span>
                  <p className="review_desc">
                    I really liked the foods of this restaurants. Class! Will
                    recommend to all guys!!
                  </p>
                  <div className="review_stars">
                    <StarIcon style={{ color: "#f2bd57" }} />
                    <StarIcon style={{ color: "#f2bd57" }} />
                    <StarIcon style={{ color: "#f2bd57" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                  </div>
                </Box>
              );
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
          <Box
            className="about_left"
            sx={{
              backgroundImage: ` url(http://papays.uz:3003/uploads/members/d04f2ff1-02cb-4191-b65b-7d6bdfa87681.jpeg);
}`,
            }}
          >
            <div className="about_left_desc">
              <span>Abdurashid oshpaz</span>
              <p>Eng mazali oshxona</p>
            </div>
          </Box>
          <Box className="about_right">
            {Array.from(Array(3).keys()).map((ele, index) => {
              return (
                <Box display={"flex"} flexDirection={"row"} key={index}>
                  <div className="about_right_img"></div>
                  <div className="about_right_desc">
                    <span>Biznig mohir oshpazlarimiz</span>
                    <p>
                      Bizning oshpazlarimiz dunyo taniydigan oliygohlarda malaka
                      oshirib kelishgan
                    </p>
                  </div>
                </Box>
              );
            })}
          </Box>
        </Stack>

        <Stack
          sx={{ mt: "60px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className={"category_title"}>Oshxona Manzili</Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
            style={{ marginTop: "60px" }}
            width={"1320"}
            height={500}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
