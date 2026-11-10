let continua = 1;
let dados = { mediaI: 0, iMaisNova: 0, iMaisVelha: 0, qtPess: 0, qtBom: 0, numF: 0, numM: 0, numOutros: 0, totReg: 0 };

while (continua == 1) {
    let idade = parseInt(prompt("Digite a sua idade: "));
    let sexo = prompt("Informe o seu Genêro:\n\nM- Masculino\nF- Feminino\nO- Outros/Prefiro não informar").toUpperCase();
    let opiniao = parseInt(prompt("Qual sua Opinião sobre o filme?\n\n4- Ótimo\n3- Bom\n2- Regular\n1- Péssimo"));

    if (dados.iMaisNova == 0 && dados.iMaisVelha == 0) {
        dados.iMaisNova = idade;
        dados.iMaisVelha = idade;
    }
    else {
        if (idade > dados.iMaisVelha) {
            dados.iMaisVelha = idade;
        }
        else {
            if (idade < dados.iMaisNova) {
                dados.iMaisNova = idade;
            }
        }
    };
    dados.mediaI += idade;

    switch (sexo) {
        case 'M': {
            dados.numM++;
            break;
        }
        case 'F': {
            dados.numF++;
            break;
        }
        default:
            dados.numOutros++;
    };

    switch (opiniao) {
        case 2: {
            break;
        }
        case 1: {
            dados.qtPess++;
            break;
        }
        case 3:
        case 4:
            dados.qtBom++;
    };


    dados.totReg++;
    continua = confirm("Gostaria de fazer outro registro?");
};

dados.mediaI /= dados.totReg;
dados.qtBom = (dados.qtBom * 100) / dados.totReg;

alert("RESUMO DOS DADOS:\n\nMédia de idades: " + dados.mediaI.toFixed(2) + "\nPessoa mais Velha: " + dados.iMaisVelha + "\nPessoa mais Nova: " + dados.iMaisNova + "\n\nQuantidade de respostas negativas: " + dados.qtPess + "\nPorcentagem de respostas positivas: " + dados.qtBom.toFixed(2) + " %" + "\n\nQtd de Homens: " + dados.numM + "\nQtd de Mulheres: " + dados.numF + "\nOutros: " + dados.numOutros);