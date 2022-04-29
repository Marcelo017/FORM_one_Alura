export const valida = (input) => {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {//un objeto que no da caracteristicas del input
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector('.input-message-error').innerHTML = '';
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input)
  }
}

const tipoDeErrores = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
]

const mensajesDeError = {
  nombre: {
    valueMissing: 'El campo nombre no puede estar vacio'
  },
  email: {
    valueMissing: 'El campo email no puede estar vacio',
    typeMismatch: 'El correo es invalido'
  },
  password: {
    valueMissing: 'El campo password no puede estar vacio',
    patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
  },
  nacimiento: {
    valueMising: 'El campo nacimiento no puede estar vacio',
    customError: 'Debes tener al menos 18 años de edad'
  },
  numero: {
    valueMissing: 'Es necesario colocar un numero telefonico',
    patternMismatch: 'El formato requerido es xxxxxxxxxx'
  },
  direccion: {
    valueMissing: 'Debe colocar una direccion',
    patternMismatch: 'Debe contener entre 10 y 40 caracteres'
  },
  ciudad: {
    valueMissing: 'Agregue su cuidad',
    patternMismatch: 'Debe contener entre 10 y 40 caracteres'
  },
  estado: {
    valueMissing: 'coloque un estado',
    patternMismatch: 'Debe contener entre 10 y 40 caracteres'
  }
}


const validadores = {
  nacimiento: input => validarNacimiento(input)
}

const mostrarMensajeDeError = (tipoDeInput, input) => {
  let mensaje = '';

  tipoDeErrores.forEach(error => {
    if (input.validity[error]) {
      console.log(error)
      console.log(input.validity[error])
      console.log(mensajesDeError[tipoDeInput][error])
      mensaje = mensajesDeError[tipoDeInput][error]
    }
  })

  return mensaje;
}

const validarNacimiento = (input) => {
  const fechaCliente = new Date(input.value);
  let mensaje = ''
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = 'Debes tener al menos 18 años de edad'
  }
  input.setCustomValidity(mensaje)
}

const mayorDeEdad = (fecha) => {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  )
  return (diferenciaFechas <= fechaActual)
}

