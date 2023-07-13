import { CloudDownload } from "@mui/icons-material"
import { Avatar, Box, Button, Stack } from "@mui/material"

export function Mysettings() {
    return (
        <Stack className="my_settings_page">
            <Box className="member_media_frame">
                <img src="/auth/default_user.svg"
                    className="mb_image"
                    style={{ borderRadius: "50%" }}
                    width={"100px"}
                    height={"100px"}
                />
                <div className="media_change_box">
                    <span>Rasm Yuklash</span>
                    <p>JPG, Jpeg, PNG rasmlarni yuklay olasiz!</p>
                    <div className="up_del_box">
                        <Button component="label" style={{ minWidth: "0" }}>
                            <CloudDownload />
                            <input type="file" hidden />
                        </Button>
                    </div>
                </div>
            </Box>
            <Box className="input_frame">
                <div className="long_input">
                    <label className="spec_label">Ism</label>
                    <input className="spec_input mb_nick" placeholder="Ismoilov Akmal" type="text" name="mb_nick" />
                </div>
            </Box>
            <Box className="input_frame">
                <div className="short_input">
                    <label className="spec_label">Telefon Raqam</label>
                    <input className="spec_input mb_phone" placeholder="99890 763 78 23" type="text" name="mb_phone" />
                </div>
                <div className="short_input">
                    <label className="spec_label">manzil</label>
                    <input className="spec_input mb_phone" placeholder="99890 763 78 23" type="text" name="mb_phone" />
                </div>
            </Box>
            <Box className="input_frame">
                <div className="long_input">
                    <label className="spec_label">Ma'lumot</label>
                    <textarea name="mb_description" placeholder="mavjud emas" className="spec_textarea mb_description"  />
                </div>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
                <Button variant="contained">
                    Saqlash
                </Button>
            </Box>
        </Stack>
    )
}