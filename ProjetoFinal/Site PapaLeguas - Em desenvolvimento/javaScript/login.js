const TELEFONE_TESTE = "00123456789";
const SENHA_TESTE = "12345";

const formulario = document.querySelector("#form-login");
const campoTelefone = document.querySelector("#telefone");
const campoSenha = document.querySelector("#senha");
const mensagemErro = document.querySelector("#erro-login");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const telefone = campoTelefone.value.replace(/\D/g, ""); 
    const senha = campoSenha.value;

    if (telefone === TELEFONE_TESTE && senha === SENHA_TESTE) {
        window.location.href = formulario.dataset.destino;
    } else {
        mensagemErro.textContent = "Telefone ou senha incorretos.";
        mensagemErro.hidden = false;
        campoSenha.value = "";
        campoSenha.focus();
    }
});

document.querySelector("#mostrar-senha").addEventListener("change", (evento) => {
    campoSenha.type = evento.target.checked ? "text" : "password";
});