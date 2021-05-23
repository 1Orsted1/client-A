//funciones para conectarse a los endpoints del servidor
import { BASE_PATH, API_VERSION } from "./config";
import moment from "moment";

export function signUpApi(dataInput) {
  const url = `${BASE_PATH}/${API_VERSION}/sign-up`;

  dataFetch.usuario = dataInput.user;
  dataFetch.nombre = dataInput.name;
  dataFetch.apellido_p = dataInput.LastNameP;
  dataFetch.apellido_m = dataInput.LastNameM;
  dataFetch.tipo_usuario = dataInput.kindU;
  dataFetch.fecha_alta = moment().format("L");
  dataFetch.clave = dataInput.password;
  dataFetch.repetir = dataInput.passwordR;
  dataFetch.email = dataInput.email;

  const params = {
    method: "POST",
    body: JSON.stringify(dataFetch),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const { resultado } = result;
      if (resultado.user) {
        if (resultado.existe === undefined) {
          return {
            status: 200,
            message: "Usuario creado correctamente",
          };
        } else {
          if (resultado.existe.email !== undefined) {
            return {
              status: 404,
              message: `Ya existe una cuenta con el correo: ${resultado.existe.email}`,
            };
          } else {
            return {
              status: 404,
              message: `Ya existe una cuenta con el usuario: ${resultado.existe.usuario}`,
            };
          }
        }
      }
    })
    .catch((err) => {
      return {
        status: 404,
        message: `Error del servidor: ${err.message}`,
      };
    });
}

const dataFetch = {
  usuario: "",
  nombre: "",
  apellido_p: "",
  apellido_m: "",
  tipo_usuario: "",
  fecha_alta: "",
  estado: 0,
  fecha_baja: null,
  clave: "",
  repetir: "",
  email: "",
};
