import { Avatar, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../types/others";
import { verifiedMemberData } from "../../apiServices/verify";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { RippleBadge } from "../../Material Theme/styled";

const NewMessage = (data: any) => {
  console.log(data.new_message);
  // console.log(data.new_message.msg);

  if (data.new_message.mb_id == verifiedMemberData?._id) {
    return (
      <Box
        flexDirection={"row"}
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        sx={{ m: "10px 0px" }}
      >
        <div className="msg_right">{data.new_message.msg}</div>
      </Box>
    );
  } else {
    return (
      <Box flexDirection={"row"} display={"flex"} sx={{ m: "10px 0px" }}>
        <Avatar
          alt={data.new_message.mb_nick}
          src={data.new_message.mb_image}
        />
        <div className="msg_left">{data.new_message.msg}</div>
      </Box>
    );
  }
  return null;
};

export function CommunityChats(props: any) {
  /** INITIALIZATIONS */
  const [messageList, setMessageList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const textInput: any = useRef(null);
  const [message, setMessage] = useState<string>("");
  
  useEffect(() => {
    console.log("printed");
    socket.connect();

    socket?.on("connect", function () {
      console.log("CLIENT: connected");
    });

    socket?.on("newMsg", (new_message: ChatMessage) => {
      console.log("CLIENT: new message");
      messageList.push(
        //@ts-ignore
        <NewMessage new_message={new_message} key={messageList.length} />
      );
      setMessageList([...messageList]);
    });

    socket?.on("greetMsg", (msg: ChatGreetMsg) => {
      console.log("CLIENT: greet message");
      messageList.push(
        //@ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "serif",
          }}
        >
          {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
        </p>
      );
      setMessageList([...messageList]);
    });

    socket?.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("CLIENT: info message");
      setOnlineUsers(msg.total);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /** HANDLERS */
  const getInputMessageHandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const getKeyHandler = (e: any) => {
    try {
      if (e.key == "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (error: any) {
      sweetErrorHandling(error).then();
    }
  };

  const onClickHandler = () => {
    try {
      if (!verifiedMemberData) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first", true);
        return false;
      }

      textInput.current.value = "";
      assert.ok(message, Definer.input_err3);

      const mb_image_url =
        verifiedMemberData?.mb_image ?? "/auth/default_user.svg";

      socket.emit("createMsg", {
        msg: message,
        mb_id: verifiedMemberData?._id,
        mb_nick: verifiedMemberData?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");
      //clean input
      //send message to socket
    } catch (error: any) {
      console.log("onClickHandler, Error:", error);
      sweetErrorHandling(error).then();
    }
  };

  return (
    <Stack className="chat_frame">
      <Box className="chat_top">
        <div>Jonli Muloqot</div>
        <RippleBadge
          style={{ margin: "-30px 0 0 20px" }}
          badgeContent={onlineUsers}
        />
      </Box>
      <Box className="chat_content">
        <Stack className="chat_main">
          <Box flexDirection={"row"} display={"flex"} sx={{ m: "10px 0px" }}>
            <div className="msg_left">Bu yerda jonli muloqot</div>
          </Box>
          {messageList}
        </Stack>
      </Box>
      <Box className="chat_bott">
        <input
          ref={textInput}
          type="text"
          name="message"
          className="msg_input"
          placeholder="Xabar jo'natish"
          onChange={getInputMessageHandler}
          onKeyDown={getKeyHandler}
        />
        <button onClick={onClickHandler} className="send_msg_btn">
          <SendIcon style={{ color: "#fff" }} />
        </button>
      </Box>
    </Stack>
  );
}
