window.addEventListener("load", function () {
  const form = document.querySelector("#form-productNew");
  const name = document.querySelector("#nameEP");
  const description = document.querySelector("#descriptionEP");
  const image = document.querySelector("#imageEP");

  form.addEventListener("submit", function (e) {
    let hasErrors = {
      name: nameValidator(),
      description: descriptionValidator(),
      image: imageValidator(),
    };

    if (hasErrors.name || hasErrors.description || hasErrors.image) {
      e.preventDefault();
    } else {
      alert("la validacion fue exitosa");
      form.submit();
    }
  });

  name.addEventListener("blur", nameValidator);
  description.addEventListener("blur", descriptionValidator);
  image.addEventListener("change", imageValidator);

  writeMsg = (...arrToWrite) => {
    arrToWrite.forEach((elementWrite) => {
      document.getElementById(elementWrite.id).innerText = elementWrite.msg;
      document.getElementById(elementWrite.id).style.color = "red";
    });
  };

  function nameValidator() {
    let id = "name-error";
    if (!name.value) {
      writeMsg({ id, msg: "El nombre no puede estar vacio" });
      return true;
    } else if (name.value.length < 5) {
      writeMsg({ id, msg: "El nombre no puede tener menos de 5 caracteres" });
      return true;
    }
    writeMsg({ id, msg: "" });
    return false;
  }

  function descriptionValidator() {
    let id = "description-error";
    if (!description.value) {
      writeMsg({ id, msg: "La descripcion no puede estar vacia" });
      return true;
    } else if (description.value.length < 20) {
      writeMsg({
        id,
        msg: "La descripcion no puede tener menos de 20 caracteres",
      });
      return true;
    }
    writeMsg({ id, msg: "" });
    return false;
  }

  function imageValidator() {
    let id = "image-error";
    let imageValue = image.value;
    let extensionesAceptadas = /(.jpg|.jpeg|.png|.gif)$/i;

    if (imageValue == "") {
      writeMsg({ id, msg: "Debes subir una imagen" });
      return true;
    }

    if (!extensionesAceptadas.exec(imageValue)) {
      writeMsg({
        id,
        msg: "Asegurate de que la imagen tenga el formato adecuado",
      });
      image.value = "";
      return true;
    }

    writeMsg({ id, msg: "" });
    return false;
  }
});
