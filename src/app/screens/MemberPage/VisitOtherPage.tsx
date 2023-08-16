import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Box, Button, Container, Stack } from "@mui/material";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TelegramIcon from "@mui/icons-material/Telegram"
import YoutubeIcon from "@mui/icons-material/YouTube"
import TViewer from "../../components/tuiEditor/Tviewer";

//Redux 
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle } from "./slice";
import { retrieveChosenMember, retrieveChosenMemberBoArticles, retrieveChosenSingleBoArticle } from "./selector";
import { Member } from "../../types/user";
import { BoArticles } from "../../types/boArticle";

/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setChosenMemberBoArticles: (data: BoArticles[]) => dispatch(setChosenMemberBoArticles(data)),
    setChosenSingleBoArticle: (data: BoArticles) => dispatch(setChosenSingleBoArticle(data)),
});

/** Redux Selector */
const chosenMemberRetriever = createSelector(
    retrieveChosenMember,
    (chosenMember) => ({
        chosenMember
    })
);
const chosenMemberBoArticlesRetriever = createSelector(
    retrieveChosenMemberBoArticles,
    (chosenMemberBoArticles) => ({
        chosenMemberBoArticles
    })
);
const chosenSingleBoArticleRetriever = createSelector(
    retrieveChosenSingleBoArticle,
    (chosenSingleBoArticle) => ({
        chosenSingleBoArticle
    })
);

export function VisitOtherPage(props: any) {
    /** INITIALIZATIONS */
    const { setChosenMember,
        setChosenMemberBoArticles,
        setChosenSingleBoArticle } = actionDispatch(useDispatch());

    const { chosenMember } = useSelector(chosenMemberRetriever);
    const { chosenMemberBoArticles } = useSelector(chosenMemberBoArticlesRetriever);
    const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);


    const [value, setValue] = React.useState("4")

    /** HANDLERS */
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue)
    };

    return <div className="my_page">
        <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
            <Stack className="my_page_frame">
                <TabContext value={value}>
                    <Stack className="my_page_left">
                        <Box display={"flex"} flexDirection={"column"}>
                            <TabPanel value="1">
                                <Box className="menu_name">Maqolalar</Box>
                                <Box className="menu_content">
                                    <MemberPosts />
                                    <Stack
                                        sx={{ my: "40px" }}
                                        direction={"row"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <Box className="bottom_box">
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
                                        </Box>
                                    </Stack>
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">
                                <Box className="menu_name">Followers</Box>
                                <Box className="menu_content">
                                    <MemberFollowers actions_enoubled={false} />
                                </Box>
                            </TabPanel>
                            <TabPanel value="3">
                                <Box className="menu_name">Following</Box>
                                <Box className="menu_content">
                                    <MemberFollowing actions_enoubled={false} />
                                </Box>
                            </TabPanel>

                            <TabPanel value="4">
                                <Box className="menu_name">Tanlangan Maqola</Box>
                                <Box className="menu_content">
                                    <Box className="write_content">
                                        <TViewer text={`<h3> Hello </h3>`} />
                                    </Box>
                                </Box>
                            </TabPanel>

                        </Box>
                    </Stack>
                    <Stack className="my_page_right">
                        <Box className="order_info_box">
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                            >
                                <div className="order_user_img">
                                    <img src="/auth/default_user.svg" className="order_user_avatar" alt="" />
                                    <div className="order_user_icon_box">
                                        <img src="/icons/user_icon.svg" alt="" />
                                    </div>
                                </div>
                                <span className="order_user_name">Ismoilov Akmal</span>
                                <span className="order_user_prof">User</span>
                            </Box>
                            <Box className="user_media_box">
                                <FacebookIcon />
                                <InstagramIcon />
                                <TelegramIcon />
                                <YoutubeIcon />
                            </Box>
                            <Box className="user_media_box">
                                <p className="follows">Followers: 3</p>
                                <p className="follows">Followings: 2</p>
                            </Box>
                            <p className="user_desc">Qo'shimcha ma'lumot kiritilmagan</p>
                            <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "10px" }}>
                                <TabList onChange={handleChange}>
                                    {true ? (
                                        <Tab
                                            style={{ flexDirection: "column" }}
                                            value={"4"}
                                            component={(e) => (
                                                <Button variant="contained" style={{ background: "#f70909b8" }} onClick={() => setValue("4")}>
                                                    Bekor Qilish
                                                </Button>
                                            )}
                                        />
                                    ) : (
                                        <Tab
                                            style={{ flexDirection: "column" }}
                                            value={"4"}
                                            component={(e) => (
                                                <Button variant="contained" style={{ background: "#30945e" }} onClick={() => setValue("4")}>
                                                    Follow qilish
                                                </Button>
                                            )}
                                        />
                                    )}

                                </TabList>
                            </Box>
                        </Box>
                        <Box className="my_page_menu">
                            <TabList
                                onChange={handleChange}
                            >
                                <Tab
                                    style={{ flexDirection: "column" }}
                                    value={"1"}
                                    component={() => (
                                        <div className={`menu_box ${value}`}
                                            onClick={() => setValue("1")}>
                                            <img src="/icons/post.svg" alt="" />
                                            <span>Maqolalari</span>
                                        </div>
                                    )}
                                />
                                <Tab
                                    style={{ flexDirection: "column" }}
                                    value={"2"}
                                    component={() => (
                                        <div className={`menu_box ${value}`}
                                            onClick={() => setValue("2")}>
                                            <img src="/icons/follower.svg" alt="" />
                                            <span>Follower</span>
                                        </div>
                                    )}
                                />
                                <Tab
                                    style={{ flexDirection: "column" }}
                                    value={"3"}
                                    component={() => (
                                        <div className={`menu_box ${value}`}
                                            onClick={() => setValue("3")}>
                                            <img src="/icons/following.svg" alt="" />
                                            <span>Following</span>
                                        </div>
                                    )}
                                />
                            </TabList>
                        </Box>
                    </Stack>
                </TabContext>
            </Stack>
        </Container >
    </div >
}