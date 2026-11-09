import { sessao } from "./sessao.js";

const BASE_URL = "https://localhost:7026/api";

export class ApiError extends Error {
    constructor(mensagem, status, dados) {
        super(mensagem);
        this.status = status;
        this.dados = dados;
    }
}

async function request(metodo, caminho, corpo, { auth = true } = {}) {
    const headers = { Accept: "application/json" };
    if (corpo !== undefined) headers["Content-Type"] = "application/json";

    if (auth) {
        const s = sessao.obter();
        if (!s) throw new ApiError("Sessão expirada. Faça login novamente.", 401);
        headers.Authorization = `Bearer ${s.token}`;
    }

    let resposta;
    try {
        resposta = await fetch(BASE_URL + caminho, {
            method: metodo,
            headers,
            body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
        });
    } catch {
        throw new ApiError("Não foi possível conectar ao servidor.", 0);
    }

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        if (resposta.status === 401 && auth) sessao.limpar();
        throw new ApiError(dados?.message ?? dados?.title ?? "Erro na requisição.", resposta.status, dados);
    }
    return dados;
}

export const http = {
    get: (c, o) => request("GET", c, undefined, o),
    post: (c, corpo, o) => request("POST", c, corpo, o),
    put: (c, corpo, o) => request("PUT", c, corpo, o),
    delete: (c, o) => request("DELETE", c, undefined, o),
};