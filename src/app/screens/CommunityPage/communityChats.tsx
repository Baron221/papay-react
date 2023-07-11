import { Avatar, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send"


export function CommunityChats(props: any) {
    return (
        <Stack className="chat_frame">
            <Box className="chat_top">
                Jonli Muloqot
            </Box>
            <Box className="chat_content">
                <Stack className="chat_main">
                    <Box flexDirection={"row"} display={"flex"} sx={{ m: "10px 0px" }}>
                        <div className="msg_left">Bu yerda jonli muloqot</div>
                    </Box>
                    <Box flexDirection={"row"} display={"flex"} alignItems={"flex-end"} justifyContent={"flex-end"} sx={{ m: "10px 0px" }}>
                        <div className="msg_right">Bu sizning xabaringiz</div>
                    </Box>
                    <Box flexDirection={"row"} display={"flex"} sx={{ m: "10px 0px" }}>
                        <Avatar src="/community/cute_girl.jpg" />
                        <div className="msg_left">Bu yerda boshqalarning xabari</div>
                    </Box>
                </Stack>
            </Box>
            <Box className="chat_bott">
                <input type="text" name="message" className="msg_input" placeholder="Xabar jo'natish" />
                <button className="send_msg_btn">
                    <SendIcon style={{ color: "#fff" }} />
                </button>
            </Box>
        </Stack>
    )
}