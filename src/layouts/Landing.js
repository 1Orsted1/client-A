import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./Landing.scss";

export default function Landing(props) {
  const { routes } = props;
  const { Content } = Layout;
  return (
    <Layout className="layoutLanding">
      <div className="layoutLanding__title"></div>
      <Content className="layoutLanding__content">
        <LoadRoutes routes={routes} />
      </Content>
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
