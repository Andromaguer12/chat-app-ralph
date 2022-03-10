import { lazy } from "react";
import { allRoutes } from "../allroutes";

export const publicRoutes = [
    {
        path: allRoutes.login,
        component: lazy(() => import("../../App")),
        redirect: true,
        to: allRoutes.dashboard
    },
]