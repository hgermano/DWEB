const CHAVE = "papaleguas.sessao";

export const sessao = {
    salvar({ result }) {
        sessionStorage.setItem(CHAVE, JSON.stringify({
            token: result.token.token,
            expiraEm: result.token.expiresAt,
            userId: result.userId,
            nome: result.name,
            email: result.email,
            papel: result.role,
        }));
    },
    obter() {
        try {
            const s = JSON.parse(sessionStorage.getItem(CHAVE));
            if (s && new Date(s.expiraEm) > new Date()) return s;
        } catch { /* ignora */ }
        this.limpar();
        return null;
    },
    limpar: () => sessionStorage.removeItem(CHAVE),
};