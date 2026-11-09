import { exigirLogin } from "../core/guard.js";
import { services } from "../api/services.js";
import { carwashes } from "../api/carwashes.js";
import { tratarFormulario } from "../ui/formulario.js";
import {
    moedaParaNumero, numeroParaMoeda, minutosParaTempo, tempoParaMinutos,
    horaParaApi, horaDaApi, horaCurta,
} from "../ui/formatos.js";

const sessaoAtual = exigirLogin("Admin", "../loginAdmin.html");
if (sessaoAtual) iniciar();

function iniciar() {
    const listaResumo = document.querySelector(".lista-servAtivos");
    const listaModal = document.querySelector(".services-list");
    const formCriar = document.querySelector("#modal-criaServico form");
    const formEditar = document.querySelector("#modal-editaServico form");
    const formHorario = document.querySelector("#modal-editHorario form");

    let lista = [];
    let idEditando = null;
    let lavaRapido = null;

    // dados do usuário logado
    document.querySelector(".userInfo-dados p").textContent = sessaoAtual.nome;
    document.querySelector(".userInfo-dados span").textContent = sessaoAtual.email;

    // =====================================================
    // SERVIÇOS
    // =====================================================

    // prefixo "" = modal de criar, "edit-" = modal de editar
    const lerFormulario = (p) => {
        const v = (id) => document.getElementById(p + id).value;
        return {
            name: v("servNome").trim(),
            estimatedTime: minutosParaTempo(v("servTempo")),
            commonMinValue: moedaParaNumero(v("servPrecoMin-comum")),
            commonMaxValue: moedaParaNumero(v("servPrecoMax-comum")),
            largeMinValue: moedaParaNumero(v("servPrecoMin-grande")),
            largeMaxValue: moedaParaNumero(v("servPrecoMax-grande")),
            motorcycleMinValue: moedaParaNumero(v("servPrecoMin-moto")),
            motorcycleMaxValue: moedaParaNumero(v("servPrecoMax-moto")),
            description: v("servDescr").trim(),
        };
    };

    const preencherFormulario = (p, s) => {
        const set = (id, valor) => (document.getElementById(p + id).value = valor);
        set("servNome", s.name);
        set("servTempo", `${tempoParaMinutos(s.estimatedTime)} min`);
        set("servPrecoMin-comum", numeroParaMoeda(s.commonMinValue));
        set("servPrecoMax-comum", numeroParaMoeda(s.commonMaxValue));
        set("servPrecoMin-grande", numeroParaMoeda(s.largeMinValue));
        set("servPrecoMax-grande", numeroParaMoeda(s.largeMaxValue));
        set("servPrecoMin-moto", numeroParaMoeda(s.motorcycleMinValue));
        set("servPrecoMax-moto", numeroParaMoeda(s.motorcycleMaxValue));
        set("servDescr", s.description ?? "");
    };

    const esc = (t) => {
        const d = document.createElement("div");
        d.textContent = t;
        return d.innerHTML;
    };

    function renderizar() {
        listaResumo.innerHTML = lista
            .filter((s) => s.isActive)
            .map((s) => `<li class="itemLista-serv">${esc(s.name)}</li>`)
            .join("");

        listaModal.innerHTML = lista.map((s) => `
            <li class="services-item">
                <input type="checkbox" data-id="${s.serviceId}" ${s.isActive ? "checked" : ""}>
                <p>${esc(s.name)}</p>
                <button type="button" class="open-modal" data-editar="${s.serviceId}">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </li>`).join("");
    }

    async function carregar() {
        try {
            lista = await services.listar();
            renderizar();
        } catch (err) {
            if (err.status === 401) location.replace("../loginAdmin.html");
            else alert(err.message);
        }
    }

    // eventos (delegação, pois a lista é dinâmica)
    listaModal.addEventListener("click", (e) => {
        const botao = e.target.closest("[data-editar]");
        if (!botao) return;
        const servico = lista.find((s) => s.serviceId === botao.dataset.editar);
        idEditando = servico.serviceId;
        preencherFormulario("edit-", servico);
        document.getElementById("modal-editaServico").showModal();
    });

    listaModal.addEventListener("change", async (e) => {
        const caixa = e.target.closest("input[type='checkbox']");
        if (!caixa) return;
        const servico = lista.find((s) => s.serviceId === caixa.dataset.id);
        try {
            await services.atualizar(servico.serviceId, { ...servico, isActive: caixa.checked });
            servico.isActive = caixa.checked;
            renderizar();
        } catch (err) {
            caixa.checked = !caixa.checked;
            alert(err.message);
        }
    });

    tratarFormulario(formCriar, () => services.criar(lerFormulario("")), {
        aoSucesso: () => {
            formCriar.reset();
            formCriar.closest("dialog").close();
            carregar();
        },
    });

    tratarFormulario(
        formEditar,
        () => {
            const atual = lista.find((s) => s.serviceId === idEditando);
            return services.atualizar(idEditando, {
                ...lerFormulario("edit-"),
                serviceId: idEditando,
                isActive: atual.isActive,
            });
        },
        {
            aoSucesso: () => {
                formEditar.closest("dialog").close();
                carregar();
            },
        },
    );

    // =====================================================
    // HORÁRIOS DE FUNCIONAMENTO (só edita, não cria)
    // =====================================================

    // id do input -> campo da API (AJUSTE AQUI se os nomes do DTO forem outros)
    const CAMPOS = {
        "hSeg-ent": "weekdayOpeningTime",
        "hSeg-saida": "weekdayClosingTime",
        "hSegAlmo-ini": "weekdayLunchStart",
        "hSegAlmo-Fim": "weekdayLunchEnd",
        "hSab-ent": "saturdayOpeningTime",
        "hSab-saida": "saturdayClosingTime",
        "hSabAlmo-ini": "saturdayLunchStart",
        "hSabAlmo-Fim": "saturdayLunchEnd",
    };

    const intervalo = (a, b) => (a && b ? `${horaCurta(a)} às ${horaCurta(b)}` : null);

    function renderizarHorarios() {
        const c = (id) => lavaRapido[CAMPOS[id]];
        const texto = (id, valor) => (document.getElementById(id).textContent = valor);

        texto("res-seg-servico", intervalo(c("hSeg-ent"), c("hSeg-saida")) ?? "Fechado");
        texto("res-seg-almoco", intervalo(c("hSegAlmo-ini"), c("hSegAlmo-Fim")) ?? "Não Possui");
        texto("res-sab-servico", intervalo(c("hSab-ent"), c("hSab-saida")) ?? "Fechado");
        texto("res-sab-almoco", intervalo(c("hSabAlmo-ini"), c("hSabAlmo-Fim")) ?? "Não Possui");

        for (const [id, campo] of Object.entries(CAMPOS)) {
            document.getElementById(id).value = horaDaApi(lavaRapido[campo]);
        }
    }

    async function carregarHorarios() {
        try {
            lavaRapido = await carwashes.minha();
            console.log("carwash:", lavaRapido); // útil para conferir os nomes dos campos
            renderizarHorarios();
        } catch (err) {
            if (err.status === 404) {
                formHorario.querySelector("[type='submit']").disabled = true;
                console.warn("Nenhum estabelecimento vinculado a este admin.");
            } else if (err.status === 401) {
                location.replace("../loginAdmin.html");
            } else {
                alert(err.message);
            }
        }
    }

    function validarHorarios(d) {
        const periodos = [
            ["Segunda a Sexta", d["hSeg-ent"], d["hSeg-saida"], d["hSegAlmo-ini"], d["hSegAlmo-Fim"]],
            ["Sábados", d["hSab-ent"], d["hSab-saida"], d["hSabAlmo-ini"], d["hSabAlmo-Fim"]],
        ];
        for (const [nome, ent, sai, aIni, aFim] of periodos) {
            if (!!ent !== !!sai) throw new Error(`${nome}: informe entrada e saída.`);
            if (!!aIni !== !!aFim) throw new Error(`${nome}: informe início e fim do almoço.`);
            if (ent && ent >= sai) throw new Error(`${nome}: a saída deve ser depois da entrada.`);
            if (aIni) {
                if (aIni >= aFim) throw new Error(`${nome}: o fim do almoço deve ser depois do início.`);
                if (!ent || aIni < ent || aFim > sai) {
                    throw new Error(`${nome}: o almoço deve ficar dentro do expediente.`);
                }
            }
        }
    }

    tratarFormulario(
        formHorario,
        (dados) => {
            if (!lavaRapido) throw new Error("Estabelecimento não carregado.");
            validarHorarios(dados);
            const novo = { ...lavaRapido };
            for (const [id, campo] of Object.entries(CAMPOS)) {
                novo[campo] = horaParaApi(dados[id]);
            }
            return carwashes.atualizar(novo);
        },
        {
            aoSucesso: () => {
                formHorario.closest("dialog").close();
                carregarHorarios();
            },
        },
    );

    // =====================================================
    carregar();
    carregarHorarios();
}