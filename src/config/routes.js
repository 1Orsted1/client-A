//Este es el Layout del "Landing Page"
 import LayoutLanding from "../layouts/Landing";
//Este es el contenido del SignIn
import SignIn from "../pages/SignIn/index.js";

//Este es el Layout de Admin
import LayoutAdmin from "../layouts/LayoutAdmin";
//Este es el contenido de Admin
import Admin from "../pages/Admin";

//Este es el Layout de Basic
import LayoutBasic from "../layouts/LayoutBasic";
//Este es el home de Basic
import Basic from "../pages/Basic";

//Otros:
import Error404 from "../pages/Error404";

const routes = [
   {
    path: "/sign-in",
    component: LayoutLanding,
    exact: false,
    routes: [
      {
        path: "/sign-in",
        component: SignIn,
        exact: true,
      },
        {component:Error404}
    ],
  },
  {
    path: "/basic",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/basic",
        component: Basic,
        exact: true,
      },
      { component: Error404 },
    ],
  },
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: true,
    routes: [
      {
        path: "/admin",
        component: Admin,
        exact: true,
      },
      { component: Error404 },
    ],
  },
];

export default routes;
