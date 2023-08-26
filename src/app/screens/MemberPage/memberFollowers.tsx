import { Avatar, Box, Button, Pagination, PaginationItem, Stack } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setMemberFollowers, setMemberFollowings } from "./slice";
import { retrieveMemberFollowers } from "./selector";
import { Follower } from "../../types/follow";
import { useEffect, useState } from "react";
import { FollowSeachObj } from "../../types/others";
import FollowApiService from "../../apiServices/followApiService";
import { serviceApi } from "../../../lib/config";
import assert from "assert";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/Definer";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";




/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
});

/** Redux Selector */
const memberFollowersRetriever = createSelector(
    retrieveMemberFollowers,
    (memberFollowers) => ({
        memberFollowers
    })
);

export function MemberFollowers(props: any) {
    // INITIALIZATIONS

    const { setFollowRebuild, followRebuild, mb_id } = props;
    const { setMemberFollowers } = actionDispatch(useDispatch());
    const { memberFollowers } = useSelector(memberFollowersRetriever);
    const [followerSearchObj, setFollowerSearchObj] = useState<FollowSeachObj>({
        page: 1,
        limit: 5,
        mb_id: mb_id,
    });
    const history = useHistory();


    useEffect(() => {
        const followService = new FollowApiService();
        followService
            .getMemberFollowers(followerSearchObj)
            .then(data => setMemberFollowers(data))
            .catch(err => console.log(err)
            )
    }, [followerSearchObj, followRebuild]);

    //HANDLERS
    const subscribeHandler = async (e: any, id: string) => {
        try {
            e.stopPropagation();
            assert.ok(verifiedMemberData, Definer.auth_err1);

            const followService = new FollowApiService();
            await followService.subscribe(id);

            await sweetTopSmallSuccessAlert("Subscribed successfully!", 700, false);
            setFollowRebuild(!followRebuild);
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const handlePaginationChange = (event: any, value: number) => {
        followerSearchObj.page = value;
        setFollowerSearchObj({ ...followerSearchObj });
    };

    const visitMemberHandler = (mb_id: string) => {
        history.push(`/member-page/other?mb_id=${mb_id}`);
        document.location.reload();
    }
    return (
        <Stack>
            {memberFollowers.map((follower: Follower) => {
                const image_url = follower?.subscriber_member_data?.mb_image
                    ? `${serviceApi}/${follower.subscriber_member_data.mb_image}`
                    : "auth/default_user.svg";
                return (
                    <Box className="follow_box">
                        <Avatar
                            style={{ cursor: "pointer" }}
                            onClick={() => visitMemberHandler(follower?.subscriber_id)}
                            alt="" src={image_url} sx={{ width: 89, height: 89 }} />
                        <div
                            style={{
                                width: "400px",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "25px",
                                height: "85%",
                            }}
                        >
                            <span
                                className="username_text">
                                {follower?.subscriber_member_data?.mb_type}
                            </span>
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => visitMemberHandler(follower?.subscriber_id)}
                                className="name_text">
                                {follower?.subscriber_member_data?.mb_nick}
                            </span>
                        </div>
                        {props.actions_enoubled &&
                            (follower?.me_followed &&
                                follower.me_followed[0]?.my_following ? (
                                <Button
                                    variant="contained"
                                    className="following_already"
                                    disabled
                                >
                                    Following
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    startIcon={
                                        <img
                                            src="/icons/follow_icon.png"
                                            style={{ width: "40px" }}
                                        />
                                    }
                                    className="follow_btn"
                                    onClick={(e) => subscribeHandler(e, follower?.subscriber_id)}
                                >
                                    Follow Back
                                </Button>
                            ))}
                    </Box>
                );
            })}
            <Stack
                sx={{ my: "40px" }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box className="bottom_box">
                    <Pagination
                        count={followerSearchObj.page >= 3 ? followerSearchObj.page + 1 : 3}
                        page={followerSearchObj.page}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon,
                                }}
                                {...item}
                                color={"secondary"}
                            />
                        )}
                        onChange={handlePaginationChange}
                    />
                </Box>
            </Stack>
        </Stack>
    );
}
