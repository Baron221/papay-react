import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom'
import { VisitOtherPage } from "./VisitOtherPage";
import { VisitMyPage } from "./VisitMyPage";
import "../../../css/my_page.css";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function MemberPage(props: any) {
    const { verifiedMemberData } = props;
    console.log("memberpageverify:::",verifiedMemberData)
    let restaurant = useRouteMatch();
    const query = useQuery();
    const chosen_mb_id: string | null = query.get("mb_id");
    const chosen_art_id: string | null = query.get("art_id");

    // console.log("Query TEst::", query.get("test"));


    return (
        <div className="restaurant_page">
            <Switch>
                <Route path={`${restaurant.path}/other`}>
                    <VisitOtherPage
                        verifiedMemberData={verifiedMemberData}
                        chosen_art_id={chosen_art_id}
                        chosen_mb_id={chosen_mb_id} />
                </Route>
                <Route path={`${restaurant.path}`}>
                    <VisitMyPage verifiedMemberData={verifiedMemberData} />
                </Route>
            </Switch>
        </div>
    );
}