import { lazy } from "react";
import { allRoutes } from "../allroutes";

export const privateRoutes = [
    {
        path: allRoutes.dashboard,
        component: lazy(() => import("../../dashboard")),
        redirect: true,
        to: allRoutes.login
    }
]