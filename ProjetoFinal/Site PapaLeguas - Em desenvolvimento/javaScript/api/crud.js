import { http } from "../core/http.js";

export const crud = (rota) => ({
    listar: () => http.get(rota),
    obter: (id) => http.get(`${rota}/${id}`),
    criar: (dados) => http.post(rota, dados),
    atualizar: (id, dados) => http.put(`${rota}/${id}`, dados),
    remover: (id) => http.delete(`${rota}/${id}`),
});