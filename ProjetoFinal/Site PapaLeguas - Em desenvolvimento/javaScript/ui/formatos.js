
export const moedaParaNumero = (t) =>
    Number(String(t).replace(/[^\d,]/g, "").replace(",", ".")) || 0;

export const numeroParaMoeda = (n) =>
    "R$ " + Number(n ?? 0).toFixed(2).replace(".", ",");

export const minutosParaTempo = (m) => {
    const min = parseInt(m, 10) || 0;
    const h = String(Math.floor(min / 60)).padStart(2, "0");
    const mm = String(min % 60).padStart(2, "0");
    return `${h}:${mm}:00`;
};

export const tempoParaMinutos = (t) => {
    const [h, m] = String(t).split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
};

export const horaParaApi = (h) => (h ? `${h}:00` : null);


export const horaDaApi = (t) => (t ? String(t).slice(0, 5) : "");


export const horaCurta = (t) => {
    if (!t) return "";
    const [h, m] = String(t).split(":");
    return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
};