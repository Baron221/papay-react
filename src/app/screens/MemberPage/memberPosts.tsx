import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { Box, Checkbox, Stack } from "@mui/material";
import moment from "moment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { BoArticles } from "../../types/boArticle";
import { serviceApi } from "../../../lib/config";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/Definer";

export function MemberPosts(props: any) {
  const {
    chosenMemberBoArticles,
    renderChosenArticleHandler,
    setArticlesRebuild,
  } = props;
  /**HAndlers */

  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();

      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticlesRebuild(new Date());
    } catch (error: any) {
      console.log(error);
      sweetErrorHandling(error).then();
    }
  };

  return (
    <div>
      <Box className="post_content">
        {chosenMemberBoArticles.map((article: BoArticles) => {
          const image_url = article.art_image
            ? `${serviceApi}/${article.art_image}`
            : "/community/default_article.svg";
          return (
            <Stack className="all_article_box" sx={{ cursor: "pointer" }}>
              <Box
                className="all_article_img"
                sx={{ backgroundImage: `url('${image_url}')` }}
              ></Box>
              <Box className="all_article_container">
                <Box alignItems="center" display={"flex"}>
                  <img
                    src={
                      article?.member_data?.mb_image
                        ? `${serviceApi}/${article.member_data.mb_image}`
                        : "/auth/default_user.svg"
                    }
                    width={"35px"}
                    height={"35px"}
                    style={{ borderRadius: "50%", backgroundSize: "cover" }}
                  />
                  <span className="all_article_author_user">
                    {article?.member_data?.mb_nick}
                  </span>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{ mt: "15px" }}
                >
                  <span className="all_article_title">{article?.bo_id}</span>
                  <p className="all_article_desc">{article?.art_subject}</p>
                </Box>
                <Box>
                  <Box
                    className="article_share"
                    style={{ width: "100%", height: "auto" }}
                    sx={{ mb: "10px" }}
                  >
                    <Box
                      className="article_share_main"
                      style={{
                        color: "#fff",
                        marginLeft: "150px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        {moment(article?.createdAt).format("YY-MM-DD HH:mm")}
                      </span>
                      <Checkbox
                        sx={{ ml: "40px" }}
                        icon={<FavoriteBorder />}
                        id={article?._id}
                        checkedIcon={<Favorite style={{ color: "red" }} />}
                        checked={
                          article?.me_liked && article.me_liked[0]?.my_favorite
                            ? true
                            : false
                        }
                        onClick={targetLikeHandler}
                      />

                      <span style={{ marginRight: "18px" }}>
                        {article?.art_likes}
                      </span>

                      <RemoveRedEyeIcon />
                      <span style={{ marginLeft: "18px" }}>
                        {article?.art_views}
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>
          );
        })}
      </Box>
    </div>
  );
}
