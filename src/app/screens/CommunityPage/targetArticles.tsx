import { Box, Link, Stack } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import { Checkbox } from "@mui/material";
import moment from "moment";
import { BoArticles } from "../../types/boArticle";
import { serviceApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";

export function TargetArticles(props: any) {
    const { setArticlesRebuild } = props;
    /** HANDLERS */
    const targetLikeHandler = async (e: any) => {
        try {
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
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
    return (
        <Stack>
            {props.targetBoArticles?.map((article: BoArticles) => {
                const art_img_url = article?.art_image ? `${serviceApi}/${article.art_image}` : "http://papays.uz/community/default_article.svg";
                return (
                    <Link
                        className="all_article_box"
                        sx={{ textDecoration: "none" }}
                        href={``}
                    >
                        <Box className="all_article_img" sx={{ backgroundImage: `url(${art_img_url})` }}> </Box>
                        <Box className="all_article_container">
                            <Box alignItems={"center"} display={"flex"}>
                                <img src="/auth/default_user.svg" width={"35px"}
                                    style={{ borderRadius: "50%", backgroundSize: "cover" }}
                                    alt="" />
                                <span className="all_article_author_user">{article?.member_data.mb_nick}</span>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} sx={{ mt: "15px" }}>
                                <span className="all_article_title">{article?.bo_id}</span>
                                <p className="all_article_desc">{article?.art_subject}</p>
                            </Box>
                            <Box>
                                <Stack className="article_share">
                                    <Box className="article_share_main" sx={{ color: "rgb(255,255,255)", ml: "150px", display: "flex", alignItems: "center" }}>
                                        <span>{moment(article?.createdAt).format('YY_MM_DD HH:mm')}</span>
                                        <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
                                            <Checkbox
                                                onClick={targetLikeHandler}
                                                icon={<FavoriteBorder />}
                                                checkedIcon={<Favorite style={{ color: "red" }} />}
                                                checked={article?.me_liked && article.me_liked[0]?.my_favorite ? true : false}
                                                id={article?._id}
                                            />
                                            <span style={{ marginRight: "18px" }}>{article?.art_likes}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
                                            <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                                            <span style={{ marginRight: "18px" }}>{article?.art_views}</span>
                                        </div>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    </Link>
                )
            })}
        </Stack>
    )
}