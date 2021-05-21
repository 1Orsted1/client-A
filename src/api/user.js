//funciones para conectarse a los endpoints del servidor
import { BASE_PATH, API_VERSION } from "./config";

export function signUpApi(dataInput) {
  const url = `${BASE_PATH}/${API_VERSION}/sign-up`;

  dataFetch.usuario = dataInput.user;
  dataFetch.nombre = dataInput.name;
  dataFetch.apellido_p = dataInput.LastNameP;
  dataFetch.apellido_m = dataInput.LastNameM;
  dataFetch.tipo_usuario = dataInput.kindU;
  dataFetch.fecha_alta = getDate();
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
      if (result.resultado.user) {
        if (result.resultado.email[0][0] === undefined) {
          return {
            status: 200,
            message: "Usuario creado correctamente",
          };
        } else {

          return {
            status: 404,
            message: `Ya existe una cuenta con el correo: ${result.resultado.email[0][0].email}`,
          };
        }
      }
    })
        .catch((err) => {
      return {
        status: 404,
        message:`Error del servidor: ${err.message}`,
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

const getDate = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    return `${year}-0${month}-${day}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};
