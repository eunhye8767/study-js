const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked";

function handleClick() {
  /*
  toggle 이벤트와 동일한 방식의 코드로
  toggle 를 이용하여 적용한다.
  const hasClass = title.classList.contains(CLICKED_CLASS);

  if (hasClass) {
    title.classList.remove(CLICKED_CLASS);
  } else {
    title.classList.add(CLICKED_CLASS);
  }
   */

  title.classList.toggle(CLICKED_CLASS);
}

function init() {
  title.addEventListener('click', handleClick);
}

init();