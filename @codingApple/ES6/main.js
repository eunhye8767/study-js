// 네모 그리는 법
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 100, 100);

// 네모대신 이미지 넣기
var img1 = new Image();
var img2 = new Image();
img1.src = 'cactus.png'
img2.src = 'dinosaur.png'


// 등장 캐릭터의 속성부터 object 자료에 정리해두면 편리.
const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,

  draw() {
    // ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y, this.width, this.height)
  }
}
// dino.draw();

/**
 *  # 장애물도 역시 속성부터 object 자료에 정리해두면 편리
 * 
 *     ㄴ 장애물들은 width, height 이런게 각각 다를 수도 있다.
 *     ㄴ 바숫헌 object가 많이 필요할 듯 => class 이용
*/
class Cactus {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  draw() {
    // ctx.fillStyle = 'red';
    // 네모는 hitBox
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y, this.width, this.height)
  }
}

// var cactus = new Cactus(500, 200, 50, 50);
// cactus.draw();

/**
 * 애니메이션을 만들려면 1초에 60번 x++ 해줘야 한다.
 *  ㄴ requestAnimationFrame
 *  ㄴ https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
 * 
 *  ㄴ 게임 개발을 할 거면 자바스크립트 라이브러리 권장.
 * 
 *  ㄴ 장애물 만들 때마다 array에 담아서 보관 (ex. cactus)
 *     ==>>  cactus여러개
 * 
*/

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var animation;

function 프레임마다실행할거() {
  /**
   * # 1초에 60번 코드 실행하기
   * 
   *    ㄴ 실행횟수는 모니터 FPS에 따라 다름.
   *    ㄴ 60이 될 수 있고 그 이상, 이하가 될 수 있음.
  */ 
  animation = requestAnimationFrame(프레임마다실행할거);

  timer++;

  // 캔버스 비우기 (= 초기화)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2초마다 (60*2 = 120) 장애물(cactus) 그리는 방법
  // 프레임마다 움직이게 적용
  if (timer % 120 === 0) {
    /**
     * 120 프레임마다 
     * 장애물 이쁘게 생성하고
     * array에 집어 넣는다
     */
    var cactus = new Cactus(500, 200, 50, 50);
    cactus여러개.push(cactus);
  }

  // cactus 한 번에 그려주기
  cactus여러개.forEach((a, i, o) => {
    // x좌표가 0미만이면 제거
    if (a.x < 0) o.splice(i, 1);

    a.x--;

    충돌하냐(dino, a);
    a.draw();
  });

  /**
   *  # dino, y축값 변경
   *     ㄴ 100프레임 지나면 dino.y-- 점프 그만하기
  */
  // dino.y -= 2;
  if (점프중) {
    dino.y--;
    점프timer++;
  } else {
    if (dino.y < 200) dino.y++;
  }

  if (점프timer > 100) {
    점프중 = false;
    점프timer = 0;
  }

  // dino.x++;
  dino.draw();
}

프레임마다실행할거();

// 충돌확인
function 충돌하냐(dino, cactus) {
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.width);

  if (x축차이 < 0 && y축차이 < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

// 이벤트 - 스페이스바 누르면 점프하는 기능
var 점프중 = false;

document.addEventListener("keydown", function(e) {
  if (e.code === 'Space') {
    // console.log(e.code);
    점프중 = true;
  }
})