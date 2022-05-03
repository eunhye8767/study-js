const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  body.style.backgroundImage = `url(./img/${imgNumber + 1}.jpg)`;

  // const image = new Image();
  // image.src = `./img/${imgNumber + 1}.jpg`;
  // image.classList.add("bgImage");
  // body.appendChild(image);
  body.prepend(div);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();