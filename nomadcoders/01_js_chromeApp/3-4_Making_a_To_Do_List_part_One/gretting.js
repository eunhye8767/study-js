const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
      SHOWING_CN = "showing";


function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  // 폼 이벤트의 기본 동작을 막는다
  // 폼 이벤트 시, 새로고침(데이터가 어딘가로 전달되는 상황)
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // 유저가 없을 때
    askForName();
  } else {
    // 유저가 있을 때
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();