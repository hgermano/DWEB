import { http } from "../core/http.js";
import { sessao } from "../core/sessao.js";

export const admins = {
    async login(email, password) {
        const dados = await http.post("/admins/login", { email, password }, { auth: false });
        sessao.salvar(dados);
        return dados.result;
    },
};