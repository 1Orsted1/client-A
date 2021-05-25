import React, { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../util/constants";
import "./LoginForm.scss";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInApi } from "../../api/user";
const { Item } = Form;

export default function LoginForm() {
  const [formItems, setFItems] = useState({
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    setFItems({
      ...formItems,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    const username = formItems.user;
    const password = formItems.password;
    if (!username || !password) {
      notification["error"]({
        message: "Necesita ingresar el usuario y la contraseña",
      });
    } else {
      const result = await signInApi({ username, password });
      if (result.status === 404) {
        notification["error"]({
          message: result.message,
        });
      } else {
        notification["success"]({
          message: result.message,
        });
        const { accessToken, refreshToken } = result.tokens;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);

        if (result.tipo_usuario === "Admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "./basic";
        }
      }
    }
  };

  return (
    <Form className="login-form" onChange={handleChange} onFinish={login}>
      <Item>
        <Input
          type="text"
          className="login-form__input"
          placeholder="Escribe el nombre de usuario"
          name="user"
          value={formItems.user}
          prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
        />
      </Item>

      <Item>
        <Input
          type="password"
          className="login-form__input"
          placeholder="Escribe tu contraseña"
          name="password"
          value={formItems.password}
          prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
        />
      </Item>
      <Item>
        <Button htmlType="submit" className="registerForm__button">
          Iniciar sesion
        </Button>
      </Item>
    </Form>
  );
}
