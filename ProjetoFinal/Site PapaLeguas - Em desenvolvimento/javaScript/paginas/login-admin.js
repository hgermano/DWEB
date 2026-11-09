import { admins } from "../api/admins.js";
import { tratarFormulario } from "../ui/formulario.js";
import { alternarSenha } from "../ui/senha.js";

const form = document.querySelector("#form-login");

tratarFormulario(
    form,
    ({ email, senha }) => admins.login(email.trim(), senha),
    { aoSucesso: () => (location.href = form.dataset.destino) },
);

alternarSenha(document.querySelector("#mostrar-senha"), document.querySelector("#senha"));