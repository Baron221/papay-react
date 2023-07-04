import { MonetizationOn } from "@mui/icons-material";
import { Container, Box, Stack } from "@mui/material";
import React from "react";
export function BestDishes() {
  return (
    <div className="best_dishes_frame">
      <Container>
          <Box className="category_title">Trenddagi ovqatlar</Box>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <Stack sx={{ mt: "103px" }} flexDirection={"column"}>
            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80')`,
                }}
              >
                <div className={"dish_sale"}>normal</div>
                <div className={"view_btn"}>
                  Batafsil ko'rish
                  <img
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11{" "}
                </span>
              </Stack>
            </Box>
          </Stack>

          <Stack sx={{ mt: "103px" }} flexDirection={"row"}>
            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80')`,
                }}
              >
                <div className={"dish_sale"}>normal</div>
                <div className={"view_btn"}>
                  Batafsil ko'rish
                  <img
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11{" "}
                </span>
              </Stack>
            </Box>
          </Stack>

          <Stack sx={{ mt: "103px" }} flexDirection={"row"}>
            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80')`,
                }}
              >
                <div className={"dish_sale"}>normal</div>
                <div className={"view_btn"}>
                  Batafsil ko'rish
                  <img
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11{" "}
                </span>
              </Stack>
            </Box>
          </Stack>

          <Stack sx={{ mt: "103px" }} flexDirection={"row"}>
            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80')`,
                }}
              >
                <div className={"dish_sale"}>normal</div>
                <div className={"view_btn"}>
                  Batafsil ko'rish
                  <img
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11{" "}
                </span>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
