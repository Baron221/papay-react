import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { Box, Checkbox, Stack } from "@mui/material";
import moment from "moment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import { BoArticles } from "../../types/boArticle";
import { serviceApi } from "../../../lib/config";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";

export function MemberPosts(props: any) {
    const { chosenMemberBoArticles, renderChosenArticleHandler, setArticlesRebuild } = props;

    /** HANDLERS */
    const targetLikeHandler = async (e: any) => {
        try {
            e.stopPropagation();
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const memberService = new MemberApiService();
            const like_result = await memberService.memberLikeTarget({
                like_ref_id: e.target.id,
                group_type: 'community',
            });
            assert.ok(like_result, Definer.general_err1);
            await sweetTopSmallSuccessAlert('success', 700, false);
            setArticlesRebuild(new Date())
        } catch (error: any) {
            console.log(error);
            sweetErrorHandling(error).then();
        }
    }


    const image_url = 'http://papays.uz/community/default_article.svg'
    return <div>
        <Box className="post_content">
            {chosenMemberBoArticles?.map((article: BoArticles) => {
                const image_path = article.art_image ? `${serviceApi}/${article.art_image}` : image_url
                return (
                    <Stack
                        onClick={() => renderChosenArticleHandler(article._id)}
                        className="all_article_box" sx={{ cursor: "pointer" }}>
                        <Box className="all_article_img"
                            sx={{ backgroundImage: `url(${image_path})` }}>
                        </Box>
                        <Box className="all_article_container">
                            <Box alignItems="center" display={"flex"}>
                                <img src={article?.member_data?.mb_image
                                    ? `${serviceApi}/${article.member_data.mb_image}`
                                    : "/auth/default_user.svg"
                                } width={"35px"} height={"35px"}
                                    style={{ borderRadius: "50%", backgroundSize: "cover" }} />
                                <span className="all_article_author_user">{article.member_data.mb_nick}</span>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} sx={{ mt: "15px" }}>
                                <span className="all_article_title">{article.bo_id}</span>
                                <p className="all_article_desc">{article.art_subject}</p>
                            </Box>
                            <Box>
                                <Box className="article_share" style={{ width: "100%", height: "auto" }}
                                    sx={{ mb: "10px" }}>
                                    <Box
                                        className="article_share_main"
                                        style={{
                                            color: "#fff",
                                            marginLeft: "150px",
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <span>{moment(article?.createdAt).format("YY-MM-DD HH:mm")}</span>
                                        <Checkbox
                                            onClick={targetLikeHandler}
                                            sx={{ ml: "40px" }}
                                            icon={<FavoriteBorder />}
                                            id={article?._id}
                                            checkedIcon={<Favorite style={{ color: "red" }} />}
                                            checked={article?.me_liked && article.me_liked[0]?.my_favorite ? true : false}
                                        />

                                        <span style={{ marginRight: "18px" }}>{article.art_likes}</span>

                                        <RemoveRedEyeIcon />
                                        <span style={{ marginLeft: "18px" }}>{article.art_views}</span>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                )
            })}
        </Box>

    </div>
}