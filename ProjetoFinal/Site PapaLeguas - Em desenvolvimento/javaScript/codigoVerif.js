const formulario = document.querySelector("#form-codigo");
const digitos = document.querySelectorAll(".codigo-digito");
const campoCodigo = document.querySelector("#codigo"); 

const destinos = {
    cadastro: "./criarSenha.html",
    recuperacao: "./recSenha.html",
};
const origem = new URLSearchParams(window.location.search).get("origem");
const destino = destinos[origem] ?? "./login.html"; 

function lerCodigo() {
    return [...digitos].map((digito) => digito.value).join("");
}

digitos.forEach((digito, posicao) => {
    digito.addEventListener("input", () => {
        digito.value = digito.value.replace(/\D/g, "");
        campoCodigo.value = lerCodigo();

        if (digito.value && posicao < digitos.length - 1) {
            digitos[posicao + 1].focus();
        }

        if (campoCodigo.value.length === digitos.length) {
            formulario.requestSubmit(); 
        }
    });

    digito.addEventListener("keydown", (evento) => {
        if (evento.key === "Backspace" && !digito.value && posicao > 0) {
            evento.preventDefault();
            digitos[posicao - 1].value = "";
            digitos[posicao - 1].focus();
            campoCodigo.value = lerCodigo();
        }
    });

    digito.addEventListener("focus", () => digito.select());
});

formulario.addEventListener("paste", (evento) => {
    evento.preventDefault();
    const colado = evento.clipboardData.getData("text").replace(/\D/g, "").slice(0, digitos.length);

    colado.split("").forEach((numero, posicao) => {
        digitos[posicao].value = numero;
    });

    campoCodigo.value = lerCodigo();
    digitos[Math.min(colado.length, digitos.length - 1)].focus();

    if (colado.length === digitos.length) {
        formulario.requestSubmit();
    }
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    campoCodigo.value = lerCodigo();

    window.location.href = destino;
});