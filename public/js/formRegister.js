const expresiones = {
	usuario: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    img: /(.jpg|.jpeg|.png|.gif)$/i
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false,
    img: false
}

window.addEventListener('load', function() {
    const form = document.querySelector('.form-register');
    const button = document.getElementById('form__btn');
    const inputs = document.querySelectorAll('#formulario input');

    console.log(inputs);
    
    const validarFormulario = function(e){
        switch (e.target.name){
            case "name":
                validarEspacio(expresiones.usuario, e.target, "usuario");
                console.log("validare el name")
                breack;
            case "lastName":
                validarEspacio(expresiones.usuario, e.target, "lastName");
                breack;
            case "telefono":
                validarEspacio(expresiones.telefono, e.target, "telefono");
                breack;
            case "email":
                validarEspacio(expresiones.correo, e.target, "correo");
                breack;
            case "password":
                validarEspacio(expresiones.password, e.target, "password");
                validarPassword();
                breack;
            case "passwordConfirm":
                validarPassword();
                breack;
        }
    }
const validarEspacio = (expressiones, input, campo)=>{
    if(expressiones.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("form__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("form__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add("form__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove('form__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}
const validarPassword = ()=>{
    const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('passwordConfirm');
    
    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`grupo__passwordConfirm`).classList.add("form__grupo-incorrecto");
        document.getElementById(`grupo__passwordConfirm`).classList.remove('form__grupo-correcto');
        document.querySelector(`#grupo__passwordConfirm i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__passwordConfirm i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__passwordConfirm .form__grupo-input`).classList.add("form__grupo-input-error-activo");
        campos['password'] = false;
    }else{
        document.getElementById(`grupo__passwordConfirm`).classList.remove("form__grupo-incorrecto");
        document.getElementById(`grupo__passwordConfirm`).classList.add('form__grupo-correcto');
        document.querySelector(`#grupo__passwordConfirm i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__passwordConfirm i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__passwordConfirm .form__grupo-input`).classList.remove("form__grupo-input-error-activo");
        campos['password'] = true;
    }
}



    
let image = document.querySelector('.avatar')
image.addEventListener('change',()=>{

    if (!expresiones.img.exec(image.value)) {
        document.querySelector(`#grupo_File .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos.img = false;
        image.value = "";
    }else{
        document.querySelector(`#grupo_File .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos.img = true;
    }
})
    
                


    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    button.addEventListener('click', (e) => {
        e.preventDefault()
    const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.password && campos.correo && campos.telefono  &&campos.img && terminos.checked ){
        // formulario.reset();

		document.getElementById('form__mensaje-exito').classList.add('form__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('form__mensaje-exito').classList.remove('form__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.form__grupo-correcto').forEach((icono) => {
			icono.classList.remove('form__grupo-correcto');
		});
        form.submit();
	} else {
		document.getElementById('form__mensaje').classList.add('form__mensaje-activo');
	}
    })
});