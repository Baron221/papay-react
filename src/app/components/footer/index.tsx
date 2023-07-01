import { Box, Container, Stack } from "@mui/material";
import React from "react";
export function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack  className="main_footer_container">
          <Stack flexDirection={"row"} style={{ height: "242px" }}>
            <Stack className="info" flexDirection={"column"}>
              <Box>
                <img src={"/Papays.svg"} alt="" />
              </Box>
              <Box className="main_text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                voluptates sapiente nisi atque earum quia obcaecati quasi
                maiores nemo delectus sunt dolor ut voluptatibus repellendus
                consequatur, aut ducimus non quod!
              </Box>
              <Stack className="contact_links">
                <Box>
                  <img src={"/icons/facebook.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/twitter.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/instagram.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/youtube.svg"} />
                </Box>
              </Stack>
            </Stack>
            <Stack className="parts">
                <Box className="part_subject">Bo'limlar</Box>
                <Box className="devider"></Box>
                <Box className="targets"> Bosh Sahifa Oshxonalar Jamiyat Yordam </Box>
            </Stack>
            <Stack className="find_us">
                <Box className="find">Bizni top</Box>
                <Box className="devider"></Box>
                <Stack className="details" sx={{mt:"19px"}}>
                    <Box className="detail_first">I</Box>
                    <Box className="detail_second">Uzbekistan</Box>                </Stack>
                <Stack className="details" sx={{mt:"42px"}}>
                   <Box className="detail_first">I</Box>
                   <Box className="detail_second">+998909889999</Box>
                </Stack>
                <Stack className="details" sx={{mt:"9px"}}>
                   <Box className="detail_first">I</Box>
                   <Box className="detail_second">papays@restaurant@gmail.com</Box>                 </Stack>
            </Stack>
          </Stack>
          <Box className="liner"></Box>
          <Box className="copyrights">
            Copyright Papays 2022 , All rights reserved.
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
