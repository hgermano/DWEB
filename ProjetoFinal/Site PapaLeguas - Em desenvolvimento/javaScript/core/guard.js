import { sessao } from "./sessao.js";

export function exigirLogin(papel, destino = "/loginAdmin.html") {
    const s = sessao.obter();
    if (!s || (papel && s.papel !== papel)) {
        location.replace(destino);
        return null;
    }
    return s;
}