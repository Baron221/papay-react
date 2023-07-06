import { ArrowBack, Favorite } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import SearchIcon from "@mui/icons-material/Search"
import React from "react";
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link, Typography } from "@mui/joy";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CallIcon from '@mui/icons-material/Call';
import VisibilityIcon from '@mui/icons-material/Visibility';

const order_list = Array.from(Array(8).keys())

export function AllRestaurants() {
return <div className="all_restaurant">
        <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Box className="file_search_box">
                    <Box className="file_box">
                        <a>Zo'r</a>
                        <a>Mashhur</a>
                        <a>Trenddagi</a>
                        <a>Yangi</a>
                    </Box>
                    <Box className="search_big_box">
                        <form action="" method="" className="search_form">
                            <input type="search" className="searchInput" name="resSearch" placeholder="Qidiruv" />
                            <Button className="button_search" variant="contained" endIcon={<SearchIcon />}>Izlash</Button>
                        </form>
                    </Box>
                </Box>
                <Stack className="all_res_box">
                    <CssVarsProvider>
                        {order_list.map(ele => {
                            return (
<Card
                            variant="outlined"
                            sx={{ minHeight: 410, minWidth: 290, mx: "17px", my: "20px" }}>
                            <CardOverflow>
                                <AspectRatio ratio={"1"}>
                                    <img src={"/restaurant/burak.png"} />
                                </AspectRatio>
                                <IconButton
                                    aria-label="Like miniaml photography"
                                    size="md"
                                    variant="solid"
                                    color="neutral"
                                    sx={{
                                        position: "absolute",
                                        zIndex: 2,
                                        borderRadius: "50%",
                                        right: "1rem",
                                        bottom: 0,
                                        transform: "translateY(50%)",
                                        color: "rgba(0,0,0,.4)",
                                    }}
                                >
                                    <Favorite style={{ color: "white" }} />
                                </IconButton>
                            </CardOverflow>
                            <Typography level="h2" sx={{ fontSize: "md", mt: 2 }} >
                                Texas De Brazil Restaurant
                            </Typography>
                            <Typography
                                level="body2"
                                sx={{ mt: 0.5, mb: 2 }}
                            >
                                <Link
                                    href=""
                                    startDecorator={<LocationOnRoundedIcon />}
                                    textColor="neutral.300"
                                >
                                    Haeundaegu, Busan, Korea
                                </Link>
                            </Typography>
                            <Typography
                                level="body2"
                                sx={{ mt: 0.5, mb: 2 }}
                            >
                                <Link
                                    startDecorator={<CallIcon />}
                                    textColor="neutral.700"
                                >
                                    +8210-8405-4875
                                </Link>
                            </Typography>
                            <CardOverflow
                                variant="soft"
                                sx={{
                                    display: "flex",
                                    gap: 1.5,
                                    py: 1.5,
                                    px: "var(--Card-padding)",
                                    borderTop: "1px solid",
                                    borderColor: "neutral.outlinedBorder",
bgcolor: "background.level1"
                                }}
                            >
                                
                                <Typography
                                    level="body3"
                                    sx={{
                                        fontWeight: "md",
                                        color: "text.secondary",
                                        alignItems: "center",
                                        display: "flex"
                                    }}
                                >
                                    100{" "}
                                    <VisibilityIcon sx={{ fontSize: "md", marginLeft: "5px" }} />
                                </Typography>
                                <Box sx={{ width: 2, bgcolor: "divider" }} />
                                <Typography sx={{
                                    fontWeight: "md",
                                    color: "neutral.300",
                                    alignItems: "center",
                                    display: "flex"
                                }} >
                                    <div>50</div>
                                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                                </Typography>
                            </CardOverflow>
                        </Card>
                            )
                        })}
                        
                    </CssVarsProvider>
                </Stack>
                <Stack className="bottom_box">
                    <img className="line_img" src="http://papays.uz/restaurant/line.svg" alt="" />
                    <Pagination
                        count={3}
                        page={1}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon
                                }}
                                {...item}
                                color="secondary"
                            />
                        )}
                    />
                    <img className="line_two_img" src="/restaurant/line_two.svg" alt="" />
                </Stack>
            </Stack>
        </Container>
    </div>
}