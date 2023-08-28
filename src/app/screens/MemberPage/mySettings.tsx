import { CloudDownload } from "@mui/icons-material"
import { Avatar, Box, Button, Stack } from "@mui/material"
import { useState } from "react"
import { verifiedMemberData } from "../../apiServices/verify"
import { MemberUpdateData } from "../../types/user";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";

export function Mysettings() {
    /** INITIALIZATIONS */
    const [file, setFile] = useState(verifiedMemberData?.mb_image);

    const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
        mb_nick: "",
        mb_phone: "",
        mb_address: "",
        mb_description: "",
        mb_image: ""
    })

    /** HANDLERS */
    const changeMemberNickHandler = (e: any) => {
        memberUpdate.mb_nick = e.target.value;
        setMemberUpdate({ ...memberUpdate })
    };
    const changeMemberPhoneHandler = (e: any) => {
        memberUpdate.mb_phone = e.target.value;
        setMemberUpdate({ ...memberUpdate })
    };
    const changeMemberAddressHandler = (e: any) => {
        memberUpdate.mb_address = e.target.value;
        setMemberUpdate({ ...memberUpdate })
    };
    const changeMemberDescriptionHandler = (e: any) => {
        memberUpdate.mb_description = e.target.value;
        setMemberUpdate({ ...memberUpdate })
    };


    const handleImagePreviewer = (e: any) => {
        try {
            const file = e.target.files[0];

            const fileType = file["type"],
                validTypes = ["image/jpg", "image/jpeg", "image/png"];
            assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);

            memberUpdate.mb_image = file;
            setMemberUpdate({ ...memberUpdate });
            setFile(URL.createObjectURL(file));
        } catch (error) {
            console.log(`ERROR::: handleImagePreviewer: ${error}`);
            sweetErrorHandling(error).then();
        }

    }

    const handleSubmitButton = async () => {
        try {
            const memberService = new MemberApiService();
            const result = await memberService.updateMemberData(memberUpdate);

            assert.ok(result, Definer.general_err1);
            await sweetTopSmallSuccessAlert('Information Modified successfully', 700, false);
            window.location.reload();
        } catch (error) {
            console.log(`ERROR::: handleSubmitButton: ${error}`);
            sweetErrorHandling(error).then();
        }
    }
    return (
        <Stack className="my_settings_page">
            <Box className="member_media_frame">
                <img src={file}
                    className="mb_image"
                    style={{ borderRadius: "50%" }}
                    width={"100px"}
                    height={"100px"}
                />
                <div className="media_change_box">
                    <span>Rasm Yuklash</span>
                    <p>JPG, JPEG, PNG rasmlarni yuklay olasiz!</p>
                    <div className="up_del_box">
                        <Button
                            onChange={handleImagePreviewer}
                            component="label" style={{ minWidth: "0" }}>
                            <CloudDownload />
                            <input type="file" hidden />
                        </Button>
                    </div>
                </div>
            </Box>
            <Box className="input_frame">
                <div className="long_input">
                    <label className="spec_label">Ism</label>
                    <input
                        onChange={changeMemberNickHandler}
                        className="spec_input mb_nick" placeholder={verifiedMemberData?.mb_nick} type="text" name="mb_nick" />
                </div>
            </Box>
            <Box className="input_frame">
                <div className="short_input">
                    <label className="spec_label">Telefon Raqam</label>
                    <input
                        onChange={changeMemberPhoneHandler}
                        className="spec_input mb_phone" placeholder={verifiedMemberData?.mb_phone} type="text" name="mb_phone" />
                </div>
                <div className="short_input">
                    <label className="spec_label">manzil</label>
                    <input
                        onChange={changeMemberAddressHandler}
                        className="spec_input mb_phone" placeholder={verifiedMemberData?.mb_address ?? "manzil kiritilmagan"} type="text" name="mb_phone" />
                </div>
            </Box>
            <Box className="input_frame">
                <div className="long_input">
                    <label className="spec_label">Ma'lumot</label>
                    <textarea
                        onChange={changeMemberDescriptionHandler}
                        name="mb_description" placeholder={verifiedMemberData?.mb_description ?? "mavjud emas"} className="spec_textarea mb_description" />
                </div>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
                <Button
                    onClick={handleSubmitButton}
                    variant="contained">
                    Saqlash
                </Button>
            </Box>
        </Stack>
    )
}