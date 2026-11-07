const openButtons = document.querySelectorAll('.box');
const lista = ['Pedra', 'Papel', 'Tesoura'];
const resultado = document.getElementById('fimJogo');
const EscUser = document.getElementById('userEsc');
const EscMaq = document.getElementById('maquinaEsc');
let usuario;
let vencedor;
let maquina;

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        resultado.classList.remove('vitoria', 'derrota', 'empate');

        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        const btnEsc = button.getAttribute('data-escolha');
        usuario = parseInt(btnEsc);
        maquina = Math.floor(Math.random() * 3) + 1;

        if ((usuario == 1 && maquina == 3) || (maquina == 1 && usuario == 3)) {
            vencedor = 1;
        }
        else {
            if ((usuario == 3 && maquina == 2) || (maquina == 3 && usuario == 2)) {
                vencedor = 3;
            }
            else {
                if ((usuario == 2 && maquina == 1) || (maquina == 2 && usuario == 1)) {
                    vencedor = 2;
                }
                else {
                    vencedor = 0;
                }
            }
        }

        if (usuario == vencedor) {
            resultado.textContent = 'Você venceu!!';
            resultado.classList.add('vitoria');
        }
        else {
            if (maquina == vencedor) {
                resultado.textContent = 'Você perdeu!!';
                resultado.classList.add('derrota');
            }
            else {
                resultado.textContent = 'Empate';
                resultado.classList.add('empate');
            }
        }

        EscUser.textContent = 'Sua Escolha: ' + lista[usuario-1];
        EscMaq.textContent = 'Escolha da Máquina: ' + lista[maquina-1];

        modal.showModal();
    });
});

const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        modal.close();
    });
});