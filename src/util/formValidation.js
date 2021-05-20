//funcion para comprobar el lenght de los input del formulario
export function minLengthValidation(input, minLength) {
  const { value } = input;
    removeCLS(input);
  if (value.length >= minLength) {
    input.classList.add("succes");
    return true;
  } else {
    input.classList.add("error");
    return false;
  }
}

//funcion para comprobar el email
export function validEmail(input) {
  //eslint-disable-next-line no-useless-escape
  const email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const { value } = input;
  removeCLS(input);
  const resultEmail = email.test(value);
  if (resultEmail) {
    input.classList.add("succes");
    return true;
  } else {
    input.classList.add("error");
    return false;
  }
}

//CLS = Cass error succes
function removeCLS(input) {
  input.classList.remove("succes");
  input.classList.remove("error");
}
