document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("registerForm"); // Obtener el formulario de registro

    registerForm.addEventListener("submit", function(event) { // Agregar un evento de escucha para cuando se envíe el formulario
        event.preventDefault(); // Prevenir el envío del formulario

        let isValid = true; // Variable para rastrear si el formulario es válido

        // Restablecer los mensajes de error
        document.querySelectorAll('.error-message').forEach(function(p) {
            p.textContent = '';
        });

        // Validar el nombre (solo letras)
        const nombre = document.getElementById('nombre').value;
        const nombrePattern = /^[a-zA-Z\s]+$/; // Expresión regular para letras y espacios
        if (!nombrePattern.test(nombre)) { // Si el nombre no coincide con el patrón
            isValid = false; // El formulario no es válido
            document.getElementById('nombreError').textContent = 'El nombre no debe contener números'; // Mostrar mensaje de error
        }

        // Validar el apellido (solo letras)
        const apellido = document.getElementById('apellido').value;
        if (!nombrePattern.test(apellido)) { // Si el apellido no coincide con el patrón
            isValid = false; // El formulario no es válido
            document.getElementById('apellidoError').textContent = 'El apellido no debe contener números'; // Mostrar mensaje de error
        }

        // Validar el correo electrónico (debe ser @live.uleam.edu.ec)
        const email = document.getElementById('email').value;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/; // Expresión regular para el correo electrónico
        if (!emailPattern.test(email)) { // Si el correo electrónico no coincide con el patrón
            isValid = false; // El formulario no es válido
            document.getElementById('emailError').textContent = 'El correo debe ser del dominio @live.uleam.edu.ec'; // Mostrar mensaje de error
        }

        // Validar la contraseña
        const password = document.getElementById('password').value;
        if (password === '') { // Si la contraseña está vacía
            isValid = false; // El formulario no es válido
            document.getElementById('passwordError').textContent = 'La contraseña es requerida'; // Mostrar mensaje de error
        }

        // Confirmar la contraseña
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (confirmPassword !== password) { // Si la confirmación de contraseña no coincide con la contraseña
            isValid = false; // El formulario no es válido
            document.getElementById('confirmPasswordError').textContent = 'Las contraseñas no coinciden'; // Mostrar mensaje de error
        }

        // Validar la cédula (mínimo 10 dígitos y cédula ecuatoriana válida)
        const cedula = document.getElementById('cedula').value;
        if (!validarCedulaEcuatoriana(cedula)) { // Si la cédula no es válida según la función de validación
            isValid = false; // El formulario no es válido
            document.getElementById('cedulaError').textContent = 'La cédula no es válida'; // Mostrar mensaje de error
        }

        // Si todo es válido, mostrar el mensaje de registro exitoso
        if (isValid) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    window.location.href = 'login.html'; // Redirigir a login.html después de 5 segundos
                }
            });
        }
    });

    // Función para validar la cédula ecuatoriana
    function validarCedulaEcuatoriana(cedula) {
        if (cedula.length !== 10) { // Si la longitud de la cédula no es 10
            return false; // No es válida
        }

        const digitos = cedula.split('').map(Number); // Convertir la cédula en una matriz de dígitos
        const codigoProvincia = parseInt(cedula.substring(0, 2), 10); // Obtener el código de provincia

        if (codigoProvincia < 1 || codigoProvincia > 24) { // Si el código de provincia está fuera del rango válido
            return false; // No es válida
        }

        const digitoVerificador = digitos.pop(); // Obtener el último dígito (dígito verificador)
        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2]; // Coeficientes para el algoritmo de validación
        let suma = 0;

        digitos.forEach((digito, index) => { // Iterar sobre los dígitos de la cédula
            let producto = digito * coeficientes[index]; // Multiplicar el dígito por su coeficiente
            if (producto >= 10) { // Si el producto es mayor o igual a 10
                producto -= 9; // Restar 9 al producto
            }
            suma += producto; // Sumar el producto a la suma total
        });

        const residuo = suma % 10; // Calcular el residuo de la suma dividida por 10
        const resultado = residuo === 0 ? 0 : 10 - residuo; // Calcular el dígito verificador esperado

        return resultado === digitoVerificador; // Devolver true si el dígito verificador calculado coincide
    }
});
