document.addEventListener("click", (e) => {
    const abrir = e.target.closest("[data-modal].open-modal");
    if (abrir) {
        document.getElementById(abrir.dataset.modal)?.showModal();
        return;
    }

    const fechar = e.target.closest("[data-modal].close-modal");
    if (fechar) {
        document.getElementById(fechar.dataset.modal)?.close();
    }
});