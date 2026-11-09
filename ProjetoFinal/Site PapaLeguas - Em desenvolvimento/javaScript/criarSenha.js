const formulario = document.querySelector("#form-senha");
const campoSenha = document.querySelector("#senha");
const campoConfirmar = document.querySelector("#confirmar-senha");
const regraConfirmar = document.querySelector("#regra-confirmar");
const botao = document.querySelector("#botao-criar");

const regras = [
    { id: "regra-tamanho", teste: (senha) => senha.length >= 8 },
    { id: "regra-letra-numero", teste: (senha) => /\p{L}/u.test(senha) && /\d/.test(senha) },
    { id: "regra-maiuscula-minuscula", teste: (senha) => /\p{Lu}/u.test(senha) && /\p{Ll}/u.test(senha) },
    { id: "regra-especial", teste: (senha) => /[^\p{L}\d\s]/u.test(senha) },
];

function validar() {
    const senha = campoSenha.value;
    let senhaForte = true;

    regras.forEach((regra) => {
        const atendida = regra.teste(senha);
        document.getElementById(regra.id).classList.toggle("atendida", atendida);
        if (!atendida) senhaForte = false;
    });

    const iguais = campoConfirmar.value !== "" && campoConfirmar.value === senha;
    regraConfirmar.hidden = campoConfirmar.value === "";
    regraConfirmar.classList.toggle("atendida", iguais);

    botao.disabled = !(senhaForte && iguais);
}

campoSenha.addEventListener("input", validar);
campoConfirmar.addEventListener("input", validar);

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (botao.disabled) return;

    window.location.href = formulario.dataset.destino;
});

document.querySelector("#mostrar-senha").addEventListener("change", (evento) => {
    campoSenha.type = evento.target.checked ? "text" : "password";
    campoConfirmar.type = evento.target.checked ? "text" : "password";
});