import { Avatar, Box, Button, Stack } from "@mui/material"

//Redux 
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setMemberFollowers, setMemberFollowings } from "./slice";
import { retrieveMemberFollowers } from "./selector";
import { Follower } from "../../types/follow";




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

const followers = [
    { mb_nick: "botir", following: true },
    { mb_nick: "jonibek", following: false },
    { mb_nick: "jamshid", following: true },
]
export function MemberFollowers(props: any) {
    // INITIALIZATIONS

    const { setMemberFollowers } = actionDispatch(useDispatch());
    const { memberFollowers } = useSelector(memberFollowersRetriever);

    return (
        <Stack>
            {followers.map((follower) => {
                const image_url = "/auth/deafult_user.svg"
                return (
                    <Box className="follow_box">
                        <Avatar alt="" src={image_url} sx={{ width: 89, height: 89 }} />
                        <div
                            style={{
                                width: "400px",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "25px",
                                height: "85%"
                            }}
                        >
                            <span className="username_text">USER</span>
                            <span className="name_text">{follower.mb_nick}</span>
                        </div>
                        {props.actions_enoubled &&
                            (follower.following ? (
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
                                >
                                    Follow Back
                                </Button>
                            ))}
                    </Box>
                )
            })}
        </Stack>
    )
}