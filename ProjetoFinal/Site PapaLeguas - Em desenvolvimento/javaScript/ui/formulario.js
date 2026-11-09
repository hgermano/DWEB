export function tratarFormulario(form, acao, { aoSucesso } = {}) {
    const botao = form.querySelector("[type='submit']");
    let erro = form.querySelector(".form-erro");

    if (!erro) {
        erro = document.createElement("p");
        erro.className = "form-erro";
        erro.setAttribute("role", "alert");
        erro.hidden = true;
        form.insertBefore(erro, botao);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        erro.hidden = true;
        botao.disabled = true;
        try {
            const resultado = await acao(Object.fromEntries(new FormData(form)));
            aoSucesso?.(resultado);
        } catch (err) {
            erro.textContent = err.message;
            erro.hidden = false;
        } finally {
            botao.disabled = false;
        }
    });
}