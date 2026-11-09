const formulario = document.querySelector("#form-login");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    window.location.href = formulario.dataset.destino;
});