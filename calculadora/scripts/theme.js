const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
//const fondo = document.querySelector('.main');
const docWidth = document.documentElement.clientWidth;
const docHeight = document.documentElement.clientHeight;
const numBalls = 50;
//const ballsContainer = document.querySelector(".balls-container");
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];

  const randomLeft = Math.random() * (docWidth - 90);
  const randomTop = Math.random() * (docHeight - 90);

  ball.style.left = `${randomLeft}px`;
  ball.style.top = `${randomTop}px`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

// Animacion inicial de las bolas
balls.forEach((el, i, ra) => {
  animateBall(el, i, ra)
});

window.addEventListener("resize", function() { // En caso de redimension, volver a ejecutar los calculos y animacion
  let docWidth = document.documentElement.clientWidth;
  let docHeight = document.documentElement.clientHeight;

  //console.log(docWidth, docHeight) //DEBUG

  balls.forEach((ball, i, ra) => {
    const randomLeft = Math.random() * (docWidth - 90);
    const randomTop = Math.random() * (docHeight - 90);
    ball.style.left = `${randomLeft}px`;
    ball.style.top = `${randomTop}px`;
    
    animateBall(ball, i, ra)
  });
});

function animateBall(el, i, ra) { // Funcion de animacion
  let docWidth = document.documentElement.clientWidth;
  let docHeight = document.documentElement.clientHeight;
  let initialPosition = el.getBoundingClientRect();
  let x_initial = initialPosition.left;
  let y_initial = initialPosition.top;
  let remToPxRatio = parseFloat(getComputedStyle(document.documentElement).fontSize);

  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  if (x_initial + (to.x * remToPxRatio) > docWidth) {
    to.x = -to.x;
  }
  if (y_initial + (to.y * remToPxRatio) > docHeight) {
    to.y = -to.y;
  }

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
}

// Cambio de tema
function cambiarTema(){
  let element = document.body;
  element.classList.toggle("white");
}