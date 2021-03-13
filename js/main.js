let scoreBlock;
//отображение очков
let score = 0;
// очки внутри игры

const config = {
  step: 0,
  maxStep: 6,
  sizeCell: 16, // размер одной ячейки
  sizeBerry: 16 / 4, // размер ягоды
}
// настройки игры

const snake = {
  x: 16,
  y: 16,
  dx: config.sizeCell, // скорость по вертикали
  dy: 0,
  tails: [], // массив яччек под контрлем змеи
  maxTails: 3 // количество ячеек змеи
}

let berry = {
  x: 0,
  y: 0,
  // координаты ягод
}

let canvas = document.querySelector('#game-canvas');
let context = canvas.getContext('2d');
scoreBlock = document.querySelector('.game-score .score-count');
drowScore();

function gameLoop() {
  requestAnimationFrame(gameLoop);
  // вызываться будет бесконечно
  if (++config.step < config.maxStep) {
    return;
    // мы пропускаем дальнейшую работу функции
  }
  config.step = 0;

  context.clearRect(0, 0, canvas.width, canvas.height)

  drawBerry();
  drawSnake();
}

requestAnimationFrame(gameLoop);

function drawSnake() {
  snake.x += snake.dx;
  snake.y += snake.dy;

  collisionBorder();

  snake.tails.unshift({x: snake.x, y: snake.y});

  if (snake.tails.length > snake.maxTails) {
    snake.tails.pop();
  }

  snake.tails.forEach((el, index) => {
    if (index == 0) {
      context.fillStyle = '#FA0556';
    } else {
      context.fillStyle = '#A00034';
    }

    context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

    if (el.x === berry.x && el.y === berry.y) {
      snake.maxTails++;
      incScore();
      randomPositionBerry();
    }

    for (let i = index + 1; i < snake.tails.length; i++) {
      if (el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
        refrechGame();
      }
    }

  })
}

function collisionBorder() {
  if (snake.x < 0) {
    snake.x = canvas.width - config.sizeCell;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - config.sizeCell;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
}

function drawBerry() {
  context.beginPath();
  context.fillStyle = '#A00034';
  context.arc(berry.x + (config.sizeCell / 2),
    berry.y + (config.sizeCell / 2), config.sizeBerry, 0, 2 * Math.PI);
  context.fill();
}

function refrechGame() {
  score = 0;
  drowScore();

  snake.x = 160;
  snake.y = 160;
  snake.tails = [];
  snake.maxTails = 3;
  snake.dx = config.sizeCell;
  snake.dy = 0;

  randomPositionBerry();
}

function randomPositionBerry() {
  berry.x = getRandomIt(0, canvas.width / config.sizeCell) * config.sizeCell;
  berry.y = getRandomIt(0, canvas.height / config.sizeCell) * config.sizeCell;
}

function incScore() {
  score++;
  drowScore()
  // увеличение текущих свойств на единичку
}

function drowScore() {
  scoreBlock.innerHTML = score;
  // отображает значение на единицу
}

function getRandomIt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", function (e) {
  if (e.code == "ArrowUp") {
    snake.dy = -config.sizeCell;
    snake.dx = 0;
  } else if (e.code == "ArrowLeft") {
    snake.dx = -config.sizeCell;
    snake.dy = 0;
  } else if (e.code == "ArrowDown") {
    snake.dy = config.sizeCell;
    snake.dx = 0;
  } else if (e.code == "ArrowRight") {
    snake.dx = config.sizeCell;
    snake.dy = 0;
  }
});