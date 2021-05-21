import React, { useState } from "react";
import "./RegisterForm.scss";
import { signUpApi } from "../../api/user";
import { minLengthValidation, validEmail } from "../../util/formValidation";
import { Form, Input, Button, Select, notification } from "antd";
import {
  LockOutlined,
  LockFilled,
  UserOutlined,
  RobotOutlined,
  MailOutlined,
} from "@ant-design/icons";
const { Option } = Select;

//El que controla lo que se escribe en los input
export default function RegisterForm() {
  const [input, setInput] = useState({
    user: "",
    name: "",
    LastNameP: "",
    LastNameM: "",
    kindU: "",
    email: "",
    password: "",
    passwordR: "",
  });
  //El que dice si lo que se escribe en lo input es correcto
  const [formValidation, setFValidation] = useState({
    user: false,
    name: false,
    LastNameP: false,
    LastNameM: false,
    kindU: false,
    email: false,
    password: false,
    passwordR: false,
  });

  //funcione para manejar el select tipo de usuario
  const handleChange = (e) => {
    if (!e.target) {
      setFValidation({
        ...formValidation,
        kindU: true,
      });

      setInput({
        ...input,
        kindU: e,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validateInput = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setFValidation({ ...formValidation, [name]: validEmail(e.target) });
    }
    if (type === "password") {
      setFValidation({
        ...formValidation,
        [name]: minLengthValidation(e.target, 6),
      });
    }
    if (type === "text") {
      setFValidation({
        ...formValidation,
        [name]: minLengthValidation(e.target, 2),
      });
    }
  };

  const register = async () => {
    // const {
    //   user,
    //   name,
    //   LastNameP,
    //   LastNameM,
    //   kindU,
    //   email,
    //   password,
    //   passwordR,
    // } = formValidation;
    const Valuser = input.user;
    const Valname = input.name;
    const ValLastNameP = input.LastNameP;
    const ValLastNameM = input.LastNameM;
    const ValkindU = input.kindU;
    const Valemail = input.email;
    const Valpassword = input.password;
    const ValpasswordR = input.passwordR;

    if (
      !Valuser ||
      !Valname ||
      !ValLastNameM ||
      !ValLastNameP ||
      !ValkindU ||
      !Valemail ||
      !Valpassword ||
      !ValpasswordR
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else if (Valpassword !== ValpasswordR) {
      notification["error"]({
        message: "Las contraseñas deben ser iguales",
      });
    } else {
      const result = await signUpApi(input);
      if (result.status !== 200) {
        notification["error"]({
          message: result.message,
        });
      } else {
        notification["success"]({
          message: "Usuario agregado correctamente",
        });
        resetForm();
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("succes");
      inputs[i].classList.remove("error");
    }
    setInput({
      user: "",
      name: "",
      LastNameP: "",
      LastNameM: "",
      email: "",
      password: "",
      passwordR: "",
    });
    setFValidation({
      user: false,
      name: false,
      LastNameP: false,
      LastNameM: false,
      email: false,
      password: false,
      passwordR: false,
    });
  };

  return (
    <Form className="registerForm" onFinish={register} onChange={handleChange}>
      <Form.Item>
        <Input
          type="text"
          name="user"
          maxLength="20"
          placeholder="Nombre de usuario"
          className="registerForm__input"
          value={input.user}
          onChange={validateInput}
          prefix={<RobotOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="text"
          name="name"
          maxLength="20"
          placeholder="Nombre"
          className="registerForm__input"
          value={input.name}
          onChange={validateInput}
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="text"
          name="LastNameP"
          maxLength="20"
          placeholder="Apellido paterno"
          className="registerForm__input"
          value={input.LastNameP}
          onChange={validateInput}
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="text"
          name="LastNameM"
          maxLength="20"
          placeholder="Apellido materno"
          className="registerForm__input"
          value={input.LastNameM}
          onChange={validateInput}
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="email"
          name="email"
          maxLength="30"
          placeholder="Correo electronico"
          className="registerForm__input"
          value={input.email}
          onChange={validateInput}
          prefix={<MailOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="password"
          name="password"
          maxLength="30"
          placeholder="Contraseña(min 6 caracteres)"
          className="registerForm__input"
          value={input.password}
          onChange={validateInput}
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="password"
          name="passwordR"
          maxLength="30"
          placeholder="Repetir contraseña"
          className="registerForm__input"
          value={input.passwordR}
          onChange={validateInput}
          prefix={<LockFilled style={{ color: "rgba(0,0,0,0.25)" }} />}
        />
      </Form.Item>
      <Form.Item>
        <Select
          className="registerForm__input"
          placeholder="Tipo de usuario"
          onChange={handleChange}
        >
          <Option value="Admin">Administrador</Option>
          <Option value="Normal">Normal</Option>
          <Option value="Invitado">Invitado</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="registerForm__button">
          Crear Cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
