import { Box, Container, Stack } from "@mui/material";
import "../../../css/community.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import { CommunityChats } from "./communityChats";
import { TargetArticles } from "./targetArticles";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticles, SearchArticlesObj } from "../../types/boArticle";


//Redux
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTargetBoArticles } from "./slice";
import { retrieveTargetBoArticles } from "./selector";




/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticles[]) => dispatch(setTargetBoArticles(data))
});

/** Redux Selector */
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles
  })
);

export function CommunityPage(props: any) {
  // INITIALIZATIONS

  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);

  const [value, setValue] = useState("1");
  const [searchArticleObj, setSearchArticleObj] = useState<SearchArticlesObj>({
    bo_id: 'all',
    page: 1,
    limit: 5
  })

  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date())

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService.getTargetArticles(searchArticleObj)
      .then(data => { setTargetBoArticles(data) })
      .catch(err => console.log(err))
  }, [searchArticleObj, articlesRebuild])

  // HANDLERS
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    searchArticleObj.page = 1;
    switch (newValue) {
      case '1':
        searchArticleObj.bo_id = 'all';
        break;
      case '2':
        searchArticleObj.bo_id = 'celebrity';
        break;
      case '3':
        searchArticleObj.bo_id = 'evaluation';
        break;
      case '4':
        searchArticleObj.bo_id = 'story';
        break;
    }
    setSearchArticleObj({ ...searchArticleObj })
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    searchArticleObj.page = value;
    setSearchArticleObj({ ...searchArticleObj })
  };
  return (
    <div className="community_page">
      <div className="community_frame">
        <Container sx={{ mt: "50px", mb: "50px" }}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <CommunityChats />
            <Stack
              className="community_all_frame"
              inputMode="text"
              style={{ border: "1px solid #fff" }}
            >
              <TabContext value={value}>
                <Box className="article_tabs">
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      value={value}
                      onChange={handleChange}
                      style={{ borderColor: "blue" }}
                    >
                      <Tab label="Barcha maqolalar" value={"1"} />
                      <Tab label="Mashhurlar" value={"2"} />
                      <Tab label="Oshxonaga baho" value={"3"} />
                      <Tab label="Hikoyalar" value={"4"} />
                    </TabList>
                  </Box>
                </Box>

                <Box className="articel_main">
                  <TabPanel value="1">
                    <TargetArticles targetBoArticles={targetBoArticles} setArticlesRebuild={setArticlesRebuild} />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles targetBoArticles={targetBoArticles} setArticlesRebuild={setArticlesRebuild} />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles targetBoArticles={targetBoArticles} setArticlesRebuild={setArticlesRebuild} />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles targetBoArticles={targetBoArticles} setArticlesRebuild={setArticlesRebuild} />
                  </TabPanel>
                </Box>

                <Box className="article_bott">
                  <Pagination
                    count={searchArticleObj.page >= 3 ? searchArticleObj.page + 1 : 3}
                    page={searchArticleObj.page}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{ previous: ArrowBack, next: ArrowForward }}
                        {...item}
                        color="secondary"
                      />
                    )}
                    onChange={handlePaginationChange}
                  />
                </Box>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}