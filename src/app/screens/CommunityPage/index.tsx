import { Box, Container, Stack } from "@mui/material";
import "../../../css/community.css";
import Tab from "@mui/material/Tab";
import Pagination from "@mui/material/Pagination";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import {CommunityChats} from "./communityChats";
import {TargetArticles} from "./targetArticles";

const targetBoArticles = [1, 2, 3, 4, 5];

export function CommunityPage(props: any) {
  // INITIALIZATIONS
  const [value, setValue] = useState("1");

  // HANDLERS
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    console.log(value);
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
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                </Box>

                <Box className="article_bott">
                  <Pagination
                    count={3}
                    page={1}
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