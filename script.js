let order = [];
let clickedOrder = [];
let score = 0;

// Seleção dos elementos HTML
const blue = document.querySelector(".mnemis__item--blue");
const red = document.querySelector(".mnemis__item--red");
const green = document.querySelector(".mnemis__item--green");
const yellow = document.querySelector(".mnemis__item--yellow");
const navButtons = document.querySelector(".header__nav");
const scoreText = document.querySelector(".header__score");

// Cria ordem aleatória de números
const shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  // Indica para a função lightColor quais cores devem ser acesas
  for (const i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

// Acende as cores
const lightColor = (element, number) => {
  number *= 500;
  setTimeout(() => {
    element.classList.add("is-selected");
  }, number - 250);

  setTimeout(() => {
    element.classList.remove("is-selected");
  }, number);
};

// Checa se os botões clicados são os mesmos da ordem gerada
// No caso de erro, chama a função gameOver. Se não, nextLevel.
const checkOrder = () => {
  for (const i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }

  if (clickedOrder.length == order.length) {
    nextLevel();
  }
};

// Função para receber os cliques do usuário
const click = (color) => {
  // Condicional para retirar o clique caso o jogo não esteja ativo
  const isOverStatus = green.classList.contains("is-over");
  if (!isOverStatus) {
    clickedOrder[clickedOrder.length] = color;

    // Acende e apaga as cores clicadas pelo usuário
    createColorElement(color).classList.add("is-selected");

    setTimeout(() => {
      createColorElement(color).classList.remove("is-selected");
      checkOrder();
    }, 250);
  }
};

// Função que retorna a cor de acordo com o número gerado
// ID das cores: 0 - verde; 1 - vermelho; 2 - amarelo; 3 - azul
const createColorElement = (color) => {
  if (color === 0) {
    return green;
  } else if (color === 1) {
    return red;
  } else if (color === 2) {
    return yellow;
  } else if (color === 3) {
    return blue;
  }
};

// Função que chama o próximo nível do jogo
const nextLevel = () => {
  scoreText.innerHTML = `Pontuação: ${score}`;

  setTimeout(() => {
    score++;
    shuffleOrder();
  }, 1000);
};

// Função para game over
const gameOver = () => {
  if (score === 0) alert(`Você perdeu!\nPontuação: 0`);
  else alert(`Você perdeu!\nPontuação: ${score - 1}`);

  // Troca a pontuação pelos botões novamente
  navButtons.style.display = "block";
  scoreText.style.display = "none";

  // "Desliga" as cores
  notStarted();
};

// Função de início do jogo
const playGame = () => {
  // Zera as variáveis
  order = [];
  clickedOrder = [];
  score = 0;

  // "Liga" as cores do jogo
  green.classList.remove("is-over");
  red.classList.remove("is-over");
  yellow.classList.remove("is-over");
  blue.classList.remove("is-over");

  // Troca os botões pela pontuação
  navButtons.style.display = "none";
  scoreText.style.display = "block";

  nextLevel();
};

// Eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// Função que "desliga" o jogo
const notStarted = () => {
  green.classList.add("is-over");
  red.classList.add("is-over");
  yellow.classList.add("is-over");
  blue.classList.add("is-over");
};

notStarted();
