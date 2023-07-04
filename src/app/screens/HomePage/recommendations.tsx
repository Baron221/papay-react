import React, { useEffect } from "react";
import { Avatar, Box, Button, Container, Stack } from "@mui/material";

export function Recommendations() {
  return (
    <div className="top_article_frame">
      <Container
        maxWidth="lg"
        sx={{mb: "50px", my: "60px"}}
        style={{position: "relative"}}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{mt: "45px"}}
        >
          <Box className={"category_title"}>Tafsiya qilingan maqolalar</Box>
          <Stack className={"article_main"} flexDirection={"row"}>
            <Stack className={"article_container"}>
              <Box className={"article_category"}>Ko'p ko'rilgan</Box>
              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(https://media-cdn.tripadvisor.com/media/photo-s/1d/b0/f0/45/divan-by-demir.jpg)`
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className={"article_main_info"}>
                    <div className={"article_author"}>
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.svg"}
                        sx={{width: "35px", height: "35px"}} 
                      />
                      <span className={"author_username"}>Jonibek</span>
                    </div>
                    <span className={"article_title"}>Eng qiziqarli va mazali taomlar</span>
                    <p className={"article_desc"}></p>
                  </Box>
                </Box>
              </Stack>
              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(https://media-cdn.tripadvisor.com/media/photo-s/1d/b0/f0/45/divan-by-demir.jpg)`
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className={"article_main_info"}>
                    <div className={"article_author"}>
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.svg"}
                        sx={{width: "35px", height: "35px"}} 
                      />
                      <span className={"author_username"}>Jonibek</span>
                    </div>
                    <span className={"article_title"}>Eng qiziqarli va mazali taomlar</span>
                    <p className={"article_desc"}></p>
                  </Box>
                </Box>
              </Stack>
             
              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(https://media-cdn.tripadvisor.com/media/photo-s/1d/b0/f0/45/divan-by-demir.jpg)`
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className={"article_main_info"}>
                    <div className={"article_author"}>
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.svg"}
                        sx={{width: "35px", height: "35px"}} 
                      />
                      <span className={"author_username"}>Jonibek</span>
                    </div>
                    <span className={"article_title"}>Eng qiziqarli va mazali taomlar</span>
                    <p className={"article_desc"}></p>
                  </Box>
                </Box>
              </Stack>
              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(https://media-cdn.tripadvisor.com/media/photo-s/1d/b0/f0/45/divan-by-demir.jpg)`
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className={"article_main_info"}>
                    <div className={"article_author"}>
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.svg"}
                        sx={{width: "35px", height: "35px"}} 
                      />
                      <span className={"author_username"}>Jonibek</span>
                    </div>
                    <span className={"article_title"}>Eng qiziqarli va mazali taomlar</span>
                    <p className={"article_desc"}></p>
                  </Box>
                </Box>
              </Stack>
            </Stack>

            <Stack className={"article_container"}>
              <Box className={"article_category"}>Mashhurlar</Box>
              <Box className={"article_news"}>
                <h1 style={{color: "orange"}}>TViewer</h1>
              </Box>
              <Box className={"article_news"}>
                <h1 style={{color: "orange"}}>TViewer</h1>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}