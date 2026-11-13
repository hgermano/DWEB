function cmpMaior() {
    let num1 = parseFloat(prompt("Digite o 1° Número: "));
    let num2 = parseFloat(prompt("Digite o 2° Número: "));
    let num3 = parseFloat(prompt("Digite o 3° Número: "));

    alert("Maior número: " + Math.max(num1, num2, num3));
};

function orderCresc() {
    let numeros = [];
    let aux;

    numeros[0] = parseFloat(prompt("Digite o 1° Número: "));
    numeros[1] = parseFloat(prompt("Digite o 2° Número: "));
    numeros[2] = parseFloat(prompt("Digite o 3° Número: "));

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < (3 - 1 - i); j++) {
            if (numeros[j] > numeros[j + 1]) {
                aux = numeros[j];
                numeros[j] = numeros[j + 1];
                numeros[j + 1] = aux;
            }
        }
    }

    alert("Ordem Crescente: " + numeros);
};

function palindromo() {
    let string = prompt("Digite uma String: ");

    string = string.toLowerCase().replaceAll(' ', '');

    let textoInvert = string.split('').reverse().join('');

    if(string === textoInvert){
        alert("É um Palindromo");
    }
    else{
        alert("Não é um palindromo");
    }
};

function subString() {
    let string1 = prompt("Digite uma String: ");
    let string2 = prompt("Digite outra String: ");

    string1 = string1.toLowerCase().replaceAll(' ', '');
    string2 = string2.toLowerCase().replaceAll(' ', '');

    if((string1 == "" || string2 == "") || (string1 == undefined || string2 == undefined)){
        alert("Erro, digite outra coisa");
    }
    else{
        if(string1.includes(string2)){
            alert("A string 2 está contida na primeira");
        }
        else{
            alert("A string 2 não está contida na primeira");
        }
    }
};

function retornaData() {
    let inputData = prompt("Digite uma data (AAAA-MM-DD): ");

    let dataObj = new Date(inputData + 'T00:00:00');

    let diaSemana = dataObj.toLocaleDateString('pt-BR', {weekday: 'long'});

    alert("O dia da semana é: " + diaSemana);
};