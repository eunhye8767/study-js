const resetButton = document.querySelector(".reset");

const onReset = function(event) {
    console.log(event.target);
}
// 이벤트 생성
resetButton.addEventListener("click", onReset);