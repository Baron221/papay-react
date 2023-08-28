import { serviceApi } from "../../lib/config";
import assert from "assert";
import axios from "axios";
import { Definer } from "../../lib/Definer";
import { Member, MemberUpdateData } from "../types/user";
import { MemberLiken } from "../types/others";
// import Cookie from "universal-cookie";

class MemberApiService {
    private readonly path: string;
    constructor() {
        this.path = serviceApi;
    }

    public async loginRequest(login_data: any) {
        try {
            const result = await axios.post(this.path + "/login", login_data, {
                withCredentials: true,
            })

            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != 'fail', result?.data?.message);

            const member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
        } catch (error: any) {
            console.log(`ERROR::: loginRequest ${error.message}`);
            throw error;
        }
    }

    public async signupRequest(signup_data: any) {
        try {
            const result = await axios.post(this.path + "/signup", signup_data, {
                withCredentials: true,
            })

            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != 'fail', result?.data?.message);

            const member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
        } catch (error: any) {
            console.log(`ERROR::: signUpRequest ${error.message}`);
            throw error;
        }
    }

    public async logOutRequest() {
        try {
            const result = await axios.get(this.path + "/logout", {
                withCredentials: true,
            });
            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);

            const logout_result = result.data.state;
            return logout_result === "success";
        } catch (err: any) {
            console.log(`ERROR:: logoutRequest ${err.message} `);
            throw err;
        }
    }

    public async memberLikeTarget(data: any) {
        try {
            const url = "/member-liken",
                result = await axios.post(this.path + url, data, {
                    withCredentials: true,
                });

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            console.log("like-state:", result.data.data);

            const like_result: MemberLiken = result.data.data;
            // console.log("like_result::", like_result);

            return like_result;
        } catch (err: any) {
            console.log(`ERROR:: memberLikeTarget ${err.message} `);
            throw err;
        }
    }

    public async getChosenMember(id: string) {
        try {
            const url = `/member/${id}`;
            const result = await axios.get(this.path + url, {
                withCredentials: true,
            });
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            console.log("getChosenMember:", result.data.data);
            const member: Member = result.data.data;
            return member;
        } catch (err: any) {
            console.log(`ERROR:getChosenMember: ${err.message}`);
            throw err;
        }
    }

    public async updateMemberData(data: MemberUpdateData) {
        try {
            let formData = new FormData();
            formData.append("mb_nick", data.mb_nick || '');
            formData.append("mb_phone", data.mb_phone || '');
            formData.append("mb_address", data.mb_address || '');
            formData.append("mb_description", data.mb_description || '');
            formData.append("mb_image", data.mb_image || '');

            const result = await axios(`${this.path}/member/update`, {
                method: "POST",
                data: formData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != 'fail', result?.data?.message);

            const member: Member = result.data.data;
            localStorage.setItem('member_data', JSON.stringify(member))
            return member;
        } catch (err: any) {
            console.log(`ERROR:getChosenMember: ${err.message}`);
            throw err;
        }
    }
}


export default MemberApiService;