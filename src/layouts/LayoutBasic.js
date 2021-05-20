import React from "react";
import { Route, Switch , Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutBasic.scss";
import SignIn from "../pages/SignIn/index.js";

export default function LayoutBasic(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;

  const user = null;
  if (!user) {
    return (
        <>
        <Route path="/sign-in" component={SignIn} />
        <Redirect to="/sign-in"/>
        </>
    );
  }

  return (
    <Layout>
      <Layout>
        <Header>
          <h1>header basic </h1>
        </Header>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>
          <h1>Este es el footer basic</h1>
        </Footer>
      </Layout>
    </Layout>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
