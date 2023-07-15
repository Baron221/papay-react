import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { VisitOtherPage } from "./VisitOtherPage";
import { VisitMyPage } from "./VisitMyPage";
import "../../../css/my_page.css";

export function MemberPage() {
  let restaurant = useRouteMatch();
    return (
        <div className="restaurant_page">
            <Switch>
                <Route path={`${restaurant.path}/other`}>
                    <VisitOtherPage />
                </Route>
                <Route path={`${restaurant.path}`}>
                    <VisitMyPage />
                </Route>
            </Switch>
        </div>
    );
}