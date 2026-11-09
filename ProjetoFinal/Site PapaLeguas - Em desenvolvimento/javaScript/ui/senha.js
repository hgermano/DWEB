export function alternarSenha(checkbox, campo) {
    checkbox.addEventListener("change", () => {
        campo.type = checkbox.checked ? "text" : "password";
    });
}