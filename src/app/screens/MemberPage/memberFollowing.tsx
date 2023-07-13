import { Box, Button, Stack } from "@mui/material"
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

const followings = [
    { mb_nick: "ravhsan"},
    { mb_nick: "ulugbek"},
    { mb_nick: "temur"},
]
export function MemberFollowing(props: any) {
    return (
        <Stack>
            {followings.map((following) => {
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
                            <span className="name_text">{following.mb_nick}</span>
                        </div>
                        {props.actions_enoubled && (
                                <Button
                                    variant="contained"
                                    startIcon={
                                        <img
                                            src="/icons/follow_icon.png"
                                            style={{ width: "40px" }}
                                        />
                                    }
                                    className="follow_cancel_btn"
                                >
                                    Unfollow
                                </Button>
                            )}
                    </Box>
                )
            })}
        </Stack>
    )
}