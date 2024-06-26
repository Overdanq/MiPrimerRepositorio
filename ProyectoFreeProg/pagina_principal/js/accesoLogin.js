//Creamos un Evento Listener que siempre estara atento al momento de presionar el boton
document.getElementById("FormularioLogin").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    // Se detiene el envío del formulario y se permite ejecutar el código JavaScript que verifica las credenciales del usuario.

    // Obtener los valores de usuario y contraseña
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;

    // Verificamos las credenciales (esto es un ejemplo básico, en una aplicación real debes verificarlas en el servidor)
    // Uso una condicional para validar la contraseña, === para una igualdad estricta
    if (usuario === "marco" && contraseña === "marco123") {
        // Redireccionara a otra página si las credenciales son válidas en este caso a la calculadora
        window.location.href = "listardatos.html";
    } else {
        // Mostramos un mensaje de error si las credenciales son incorrectas
        alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
});

