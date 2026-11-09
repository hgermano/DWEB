import { http } from "../core/http.js";

export const carwashes = {
    minha: () => http.get("/carwashes/me"),
    atualizar: (dados) => http.put("/carwashes", dados),
};