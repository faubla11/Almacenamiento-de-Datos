const inputs = document.querySelectorAll("form div input, form div select"),
  adver = document.getElementById("warning"),
  btnEnviar = document.getElementById("btnEnviar");

const expresionesRegulares = {
  numeros: /([0-9])/,
  text: /([a-zA-Z])/,
  caracteres: /[^a-zA-Z\d\s]/,
  correo: /([a-z\d]+[@]+[a-z]+\.[a-z]{2,})/,
  espacios: /\s/g,
};

var c1, c2, c3, c4, c5, c6, c7, c8, c9;

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    let valueInput = e.target.value;
    let style = e.target.style;

    switch (e.target.id) {
      case "names":
        message("Debe ingresar solo letras");
        input.value = valueInput
          .replace(expresionesRegulares.caracteres, "")
          .replace(expresionesRegulares.numeros, "");
        if (valueInput.length == 0) {
          style.border = "2px solid #ce1212";
          c1 = false;
        } else {
          style.border = "2px solid #008f39";
          c1 = true;
        }
        break;

      case "lasts":
        message("Debe ingresar solo letras");
        input.value = valueInput
          .replace(expresionesRegulares.caracteres, "")
          .replace(expresionesRegulares.numeros, "");
        if (valueInput.length == 0) {
          style.border = "2px solid #ce1212";
          c2 = false;
        } else {
          style.border = "2px solid #008f39";
          c2 = true;
        }
        break;

      case "mail-reg":
        input.value = valueInput.replace(expresionesRegulares.espacios, "");
        if (expresionesRegulares.correo.test(valueInput)) {
          style.border = "2px solid #008f39";
          message("Correo electrónico correcto");
          c3 = true;
        } else {
          style.border = "2px solid #ce1212";
          message("El correo que ingreso no es correcto");
          c3 = false;
        }
        break;

      case "cell":
        input.value = valueInput
          .replace(expresionesRegulares.caracteres, "")
          .replace(expresionesRegulares.espacios, "")
          .replace(expresionesRegulares.text, "");
        if (expresionesRegulares.numeros.test(valueInput)) {
          if (valueInput.length <= 8) {
            message("Debes ingresar un número telefónico de 9 a 10 dígitos");
            style.border = "2px solid #ce1212";
            c4 = false;
          } else {
            message("Longitud de número aceptable");
            style.border = "2px solid #008f39";
            c4 = true;
          }
        } else {
          message("Debes ingresar solo números");
          style.border = "2px solid #ce1212";
          c4 = false;
        }
        break;

      case "age":
        if (valueInput.length == 0 || valueInput < 18) {
          style.border = "2px solid #ce1212";
          c5 = false;
        } else {
          style.border = "2px solid #008f39";
          c5 = true;
        }
        break;

      case "id":
        input.value = valueInput
          .replace(expresionesRegulares.caracteres, "")
          .replace(expresionesRegulares.espacios, "")
          .replace(expresionesRegulares.text, "");
        if (valueInput.length != 10) {
          message("La cédula debe tener 10 dígitos");
          style.border = "2px solid #ce1212";
          c6 = false;
        } else {
          message("Cédula válida");
          style.border = "2px solid #008f39";
          c6 = true;
        }
        break;

      case "address":
        if (valueInput.length == 0) {
          style.border = "2px solid #ce1212";
          c7 = false;
        } else {
          style.border = "2px solid #008f39";
          c7 = true;
        }
        break;

      case "birthdate":
        if (valueInput.length == 0) {
          style.border = "2px solid #ce1212";
          c8 = false;
        } else {
          style.border = "2px solid #008f39";
          c8 = true;
        }
        break;

      case "gender":
        if (valueInput.length == 0) {
          style.border = "2px solid #ce1212";
          c9 = false;
        } else {
          style.border = "2px solid #008f39";
          c9 = true;
        }
        break;
    }

    if (c1 && c2 && c3 && c4 && c5 && c6 && c7 && c8 && c9) {
      btnEnviar.disabled = false;
    } else {
      btnEnviar.disabled = true;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let warnings = "";
  let entrar = false;

  inputs.forEach((e) => {
    if (e.value == "") {
      warnings = "Todos los campos son requeridos";
      entrar = false;
      return;
    } else {
      entrar = true;
    }
  });

  if (entrar) {
    const cliente = {
      nombres: document.getElementById("names").value,
      apellidos: document.getElementById("lasts").value,
      correo: document.getElementById("mail-reg").value,
      telefono: document.getElementById("cell").value,
      direccion: document.getElementById("address").value,
      fechaNacimiento: document.getElementById("birthdate").value,
      edad: document.getElementById("age").value,
      cedula: document.getElementById("id").value,
      genero: document.getElementById("gender").value,
    };

    let clientes = localStorage.getItem("clientes");
    if (clientes) {
      clientes = JSON.parse(clientes);
    } else {
      clientes = [];
    }
    clientes.push(cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));

    form.reset();
    inputs.forEach((e) => (e.style.border = "1px solid #ccc"));
    btnEnviar.disabled = true;
    message("Cliente registrado con éxito", "green");
  } else {
    message(warnings, "red");
  }
});

window.addEventListener("load", () => {
  const clientes = JSON.parse(localStorage.getItem("clientes"));
  if (clientes) {
    console.log("Registros de clientes:", clientes);
  }
});

function message(msg, color = "red") {
  adver.innerText = msg;
  adver.style.color = color;
}
