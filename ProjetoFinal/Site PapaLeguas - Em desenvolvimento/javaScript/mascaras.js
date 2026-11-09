function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11); 

    if (numeros.length === 0) return "";
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

document.querySelectorAll('input[type="tel"]').forEach((campo) => {
    campo.addEventListener("input", () => {
        campo.value = formatarTelefone(campo.value);
    });
});