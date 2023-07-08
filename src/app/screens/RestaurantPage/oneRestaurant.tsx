import React from "react";
import { Badge, Box, Button, Checkbox, Container, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";

const restaurants_list = Array.from(Array(10).keys());
const product_list = Array.from(Array(8).keys());

export function OneRestaurant() {
   return <div className="single_restaurant">
      <Container>

         <Stack flexDirection={"column"} alignItems={"center"}>

            <Stack className="avatar_big_box">

               <Box className="top_text">
                  <p>Texas De Brazil Restaurant</p>
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
                  {restaurants_list.map((ele, index) => {
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
                  <Button color="secondary" variant="contained">new</Button>
                  <Button color="secondary" variant="contained">price</Button>
                  <Button color="secondary" variant="contained">likes</Button>
                  <Button color="secondary" variant="contained">views</Button>
               </Box>
            </Stack>

            <Stack style={{ width: "100%", display: "flex", minHeight: "600px" }} >
               <Stack className="dish_category_box">
                  <div className="dish_category_main">
                     <Button variant="contained" color="secondary">boshqa</Button>
                     <Button variant="contained" color="secondary">ichimlik</Button>
                     <Button variant="contained" color="secondary">salad</Button>
                     <Button variant="contained" color="secondary">ovqatlar</Button>
                  </div>
               </Stack>
               <Stack className="dish_wrapper">
                  {product_list.map((ele, index) => {
                     const size_volume = "normal size"
                     return (
                        <Box className="dish_box" key={`${index}`}>
                           <Box className="dish_img" sx={{ backgroundImage: `url("http://papays.uz:3003/uploads/products/445664b0-71a1-4f80-bdac-835e01279f60.jpeg")` }}>
                              <div className="dish_sale">{size_volume}</div>
                              <Button className="like_view_btn" style={{ left: "36px" }}>
                                 <Badge
                                    badgeContent={8}
                                    color="primary"
                                 >
                                    <Checkbox
                                       icon={<FavoriteBorder style={{ color: "white" }} />}
                                       id={`${index}`}
                                       checkedIcon={<Favorite style={{ color: "red" }} />}
                                       checked={false}
                                    />
                                 </Badge>
                              </Button>
                              <Button className="view_btn">
                                 <img src="/icons/shopping_cart.svg" alt="" style={{ display: "flex" }} />
                              </Button>
                              <Button className="like_view_btn" style={{ right: "36px" }}>
                                 <Badge badgeContent={100} color="primary">
                                    <Checkbox
                                       icon={<RemoveRedEyeIcon style={{ color: "white" }}
                                       />} />
                                 </Badge>
                              </Button>
                           </Box>
                           <Box className="dish_desc">
                              <span className="dish_title_text">Shirin Shashlik</span>
                              <div className="dish_desc_text">
                                 <MonetizationOnIcon /> 7
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
                           <img src="/restaurant/bestres.png" className="review_img" alt="" />
                        </Box>
                        <span className="review_name">Baron</span>
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
               backgroundImage: ` url(http://papays.uz:3003/uploads/members/d04f2ff1-02cb-4191-b65b-7d6bdfa87681.jpeg);
}` }}>
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