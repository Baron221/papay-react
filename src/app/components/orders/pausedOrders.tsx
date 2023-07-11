import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from '@mui/lab/TabPanel';

const pausedOrders = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
]
export default function PausedOrders(props: any) {
    return (
        <TabPanel value="1">
            <Stack>
                {pausedOrders?.map((order) => {
                    return (
                        <Box className="order_main_box">
                            <Box className="order_box_scroll">
                                {order.map((item) => {
                                    const img_path = `others/stake.jpg`
                                    return (
                                        <Box className="ordersName_price">
                                            <img className="orderDishImg" src={img_path} alt="" />
                                            <p className="titleDish">Stake</p>
                                            <Box className="priceBox">
                                                <p>$7</p>
                                                <img src="/icons/Close.svg" alt="" />
                                                <p>3</p>
                                                <img src="/icons/Pause.svg" alt="" />
                                                <p style={{ marginLeft: "15px" }}>$21</p>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                            <Box className="total_price_box black_solid">
                                <Box className="boxTotal">
                                    <p>mahuslot narxi </p>
                                    <p>$21</p>
                                    <img src="/icons/Plus.svg" style={{ marginLeft: "20px" }} alt="" />
                                    <p>yetkazish xizmati </p>
                                    <p>$2</p>
                                    <img src="/icons/Pause.svg" style={{ marginLeft: "20px" }} alt="" />
                                    <p>jami narx</p>
                                    <p>$23</p>

                                    <Button variant="contained" sx={{mx:"25px"}} style={{borderRadius: "10px"}} color="primary">Bekor Qilish</Button>
                                    <Button variant="contained" style={{borderRadius: "10px"}} color="secondary">To'lash</Button>

                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Stack>
        </TabPanel>
    )
}