const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");


// 10미만 시 앞에 0 붙이기
function formatTime(hms) {
  if ( hms < 10 ) {
    return result = `0${hms}`;
  } else {
    return result = `${hms}`;
  }
}
// 현재 시간 정보
function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  
  // clockTitle.innerText = `${
  //   hours < 10 ? `0${hours}` : hours
  // }:${
  //   minutes < 10 ? `0${minutes}` : minutes
  // }:${
  //   seconds < 10 ? `0${seconds}` : seconds
  // }`;
  clockTitle.innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
}

function init() {
  getTime();
  
  // 1초마다 getTime() 함수 실행
  setInterval(getTime, 1000);
}

init();