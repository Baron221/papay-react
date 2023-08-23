import { Avatar, Box, Button, Stack } from "@mui/material";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setMemberFollowings } from "./slice";
import { retrieveMemberFollowings } from "./selector";
import { FollowSearchObj, Following } from "../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import { useEffect, useState } from "react";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serviceApi } from "../../../lib/config";

/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});

/** Redux Selector */
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

const followings = [
  { mb_nick: "ravhsan" },
  { mb_nick: "ulugbek" },
  { mb_nick: "temur" },
];
export function MemberFollowing(props: any) {
  // INITIALIZATIONS
  const { mb_id, followRebuild, setFollowRebuild } = props;
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  const [followingsSearchObj, setFollowingsSearchObj] =
    useState<FollowSearchObj>({ page: 1, limit: 5, mb_id: props?.mb_id });

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings(followingsSearchObj)
      .then((data) => setMemberFollowings)
      .catch((err) => console.log(err));
  }, [followingsSearchObj, followRebuild]);

  /**HANDLERS */
  const unsubscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.unsubscribe(id);
      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handlePaginationChange = (event: any, value: number) => {
    followingsSearchObj.page = value;
    setFollowingsSearchObj({ ...followingsSearchObj });
  };

  return (
    <Stack>
      {memberFollowings.map((following: Following) => {
        const image_url = following?.follow_member_data?.mb_image
          ? `${serviceApi}/${following?.follow_member_data?.mb_image}`
          : "/auth/deafult_user.svg";
        return (
          <Box className="follow_box">
            <Avatar alt="" src={image_url} sx={{ width: 89, height: 89 }} />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">{following?.follow_member_data?.mb_type}</span>
              <span className="name_text">{following?.follow_member_data?.mb_nick}</span>
            </div>
            {props.actions_enabled && (
              <Button
                variant="contained"
                startIcon={
                  <img src="/icons/follow_icon.png" style={{ width: "40px" }} />
                }
                className="follow_cancel_btn"
                onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
              >
                Unfollow
              </Button>
            )}
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
            count={
              followingsSearchObj.page >= 3 ? followingsSearchObj.page + 1 : 3
            }
            page={followingsSearchObj.page}
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
