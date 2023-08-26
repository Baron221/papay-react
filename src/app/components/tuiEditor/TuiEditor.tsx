import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticleInput } from "../../types/boArticle";
import { serviceApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { useHistory } from "react-router-dom";

export const TuiEditor = (props: any) => {
    /** INITIALIZAtioNS */
    const editorRef = useRef();
    const [communityArticleData, setCommunityArticleData] = useState<BoArticleInput>({
        art_subject: "",
        art_content: "",
        art_image: "",
        bo_id: ""
    })
    const history = useHistory();
    /** HANDLERS */
    const uploadImage = async (image: any) => {
        try {
            const communityService = new CommunityApiService();
            const image_name = await communityService.uploadImageToServer(image);

            communityArticleData.art_image = image_name;
            setCommunityArticleData({ ...communityArticleData });

            const source = `${serviceApi}/${image_name}`;
            return source;
        } catch (error) {
            console.log(`ERROR::: uploadImage: ${error}`);
        }
    }

    const changeCategoryHandler = (e: any) => {
        communityArticleData.bo_id = e.target.value;
        setCommunityArticleData({ ...communityArticleData })
    }


    const changeTitleHandler = useCallback((e: any) => {
        communityArticleData.art_subject = e.target.value;
        setCommunityArticleData({ ...communityArticleData })
    }, [communityArticleData.art_subject])

    const handleRegisterButton = async () => {
        try {
            const editor: any = editorRef.current;
            const art_content = editor?.getInstance().getHTML();
            communityArticleData.art_content = art_content;
            assert.ok(communityArticleData.art_content !== '' &&
                communityArticleData.bo_id !== "" &&
                communityArticleData.art_subject !== "",
                Definer.input_err1
            );

            const communityService = new CommunityApiService();
            await communityService.createArticle(communityArticleData);
            await sweetTopSmallSuccessAlert("Article is created succesfully 👏");

            props.setArticlesRebuild(new Date());
            props.setValue("1");
            // window.location.reload();
        } catch (error) {
            console.log(`ERROR::: handleRegisterButton: ${error}`);
            sweetErrorHandling(error).then();
        }
    }
    return (
        <Stack>
            <Stack direction={"row"} style={{ margin: "40px" }} justifyContent={"space-evenly"}>
                <Box className="form_row" style={{ width: "300px" }}>
                    <Typography style={{ color: "rgb(255 255 233", margin: "10px" }} variant="h3">
                        Category
                    </Typography>
                    <FormControl sx={{ width: "100%", background: "white" }}>
                        <Select
                            onChange={changeCategoryHandler}
                            value={communityArticleData.bo_id} displayEmpty inputProps={{ "aria-label": "Without label" }}>
                            <MenuItem value=""><span>Categoriyani tanlang</span></MenuItem>
                            <MenuItem value="celebrity">Mashhurlar</MenuItem>
                            <MenuItem value="evaluation">Restaurant baho</MenuItem>
                            <MenuItem value="story">Mening hikoyam</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className="form_row" style={{ width: "300px" }}>
                    <Typography style={{ color: "rgb(255 255 233", margin: "10px" }} variant="h3">
                        Mavzu
                    </Typography>
                    <TextField
                        id="filled_basic"
                        label="Mavzu"
                        variant="filled"
                        style={{ width: "300px", background: "white" }}
                        onChange={changeTitleHandler}
                    />
                </Box>
            </Stack>
            {/* @ts-ignore */}
            <Editor
                ref={editorRef}
                initialValue="Type here"
                placeholder="Type here"
                previewStyle="vertical"
                height="640px"
                initialEditType="WYSIWYG"
                toolbarItems={[
                    ["heading", "bold", "italic", "strike"],
                    ["image", "table", "link"],
                    ["ul", "ol", "task"]
                ]}
                hooks={{
                    addImageBlobHook: async (image: any, callback: any) => {
                        const uploadImageURL = await uploadImage(image);
                        console.log("uploadImageURL:", uploadImageURL);
                        callback(uploadImageURL);
                        return false
                    },
                }}
                events={{
                    load: function (param: any) { },
                }}
            />
            <Stack direction={"row"} justifyContent={"center"}>
                <Button
                    onClick={handleRegisterButton}
                    variant="contained" color="primary" style={{ margin: "30px", width: "250px", height: "45px" }}>
                    Register
                </Button>
            </Stack>
        </Stack>
    )
}