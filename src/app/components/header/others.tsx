import { Container, Stack, Box, Button, MenuItem, ListItemIcon, Menu } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";
import { verifiedMemberData } from "../../apiServices/verify";


export function NavbarOthers(props: any) {
    return (<div className="format_others home_navbar">
        <Container>
            <Stack flexDirection={"row"} className="navbar_config" justifyContent={"space-between"}>
                <Box>
                    <img src="/icons/Papay.svg" alt="Papay_icon" />
                </Box>
                <Stack flexDirection={"row"} justifyContent={"space-evenly"} alignItems={"center"} className="navbar_links">
                    <Box className="hover-line" onClick={props.setPath}>
                        <NavLink to={"/"}>
                            Bosh Sahifa
                        </NavLink>
                    </Box>
                    <Box className="hover-line" onClick={props.setPath}>
                        <NavLink to={"/restaurant"} activeClassName="underline">
                            Oshhona
                        </NavLink>
                    </Box>
                    {verifiedMemberData ?
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to={"/orders"} activeClassName="underline">
                                Buyurtma
                            </NavLink>
                        </Box> :
                        null
                    }
                    <Box className="hover-line" onClick={props.setPath}>
                        <NavLink to={"/community"} activeClassName="underline">
                            Jamiyat
                        </NavLink>
                    </Box>
                    {verifiedMemberData ?
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to={"/member-page"} activeClassName="underline">
                                Sahifam
                            </NavLink>
                        </Box> :
                        null
                    }
                    <Box className="hover-line" onClick={props.setPath}>
                        <NavLink to={"/help"} activeClassName="underline">
                            Yordam
                        </NavLink>
                    </Box>
                    <Basket cartItems={props.cartItems}
                        onAdd={props.onAdd}
                        onRemove={props.onRemove}
                        onDelete={props.onDelete}
                        onDeleteAll={props.onDeleteAll}
                    />
                    {!verifiedMemberData ?
                        <Box >
                            <Button variant="contained"
                                style={{ color: "#FFFFFF", background: "#1976d2" }}
                                onClick={props.handleLoginOpen}
                            >
                                Kirish
                            </Button>
                        </Box> :
                        <img style={{ width: "48px", height: "48px", borderRadius: "24px" }}
                            src={verifiedMemberData.mb_image}
                            onClick={props.handleLogOutClick}
                        />
                    }

                    <Menu
                        open={props.open}
                        anchorEl={props.anchorEl}
                        onClose={props.handleCloseLogOut}
                        onClick={props.handleCloseLogOut}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32)",
                                mt: 1.5,
                                "&.MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <MenuItem onClick={props.handleLogoutRequest}>
                            <ListItemIcon>
                                <Logout fontSize="small" style={{ color: "blue" }} />
                                Logout
                            </ListItemIcon>
                        </MenuItem>
                    </Menu>
                </Stack>
            </Stack>
        </Container>
    </div>);
}