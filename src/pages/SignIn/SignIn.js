import React from "react";
import { Layout, Tabs } from "antd";
import "./SignIn.scss";
//import { Redirect } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
//import Logo from "../../assets/logo2.png";

const SingnIn = () => {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  return (
    <Layout className="sign-in">
        <Content className="sign-in__content">
        <div className="sign-in__content-tabs">
            <Tabs type="card">
                <TabPane tab={<span>Iniciar</span>} key="1">
                <LoginForm />      
                </TabPane>
                <TabPane tab={<span>Registro</span>} key="2"> 
                 <RegisterForm />
                </TabPane>
            </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default SingnIn;
