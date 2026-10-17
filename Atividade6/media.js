let nome = prompt("Entre com nome do aluno: ");
let nota1 = parseFloat(prompt("Entre com a 1a nota: "));
let nota2 = parseFloat(prompt("Entre com a 2a nota: "));
let nota3 = parseFloat(prompt("Entre com a 3a nota: "));
let nota4 = parseFloat(prompt("Entre com a 4a nota: "));

let media = (nota1 + nota2 + nota3 + nota4)/ 4;

alert("A média do aluno " + nome + " é: " + media.toFixed(2));