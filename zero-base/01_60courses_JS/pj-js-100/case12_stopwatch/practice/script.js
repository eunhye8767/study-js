;(function () {
  'use strict'

  class Stopwatch {
    constructor(element) {
      this.timer = element
      this.defaultTime = '00:00.00'  // 초기화
      this.startTime = 0
      this.elapsedTime = 0           // 경과된 시간
      this.interval = null
    }

    print(text) {
      this.timer.innerHTML = text
    }

    addZero(number) {
      if (number < 10) {
        return '0' + number
      }
      if (number > 99) {
        // 밀리세컨즈는 3자리수가 나오기 때문에 2자리로 보여지게 한다.
        return number.toString().slice(0, -1)
      }
      return number
    }

    timeToString(time) {
      /**
       * getUTC를 사용하여 시간 변환.
       * => 표준 시에 따라 지정된 날짜의 분을 반환
       * => getUTCMinutes()   (분)
       * => getMilliseconds() (초)
       * => getMilliseconds() (밀리세컨즈)
       */
      const date = new Date(time)
      const minutes = date.getUTCMinutes()
      const seconds = date.getUTCSeconds()
      const millisecond = date.getMilliseconds()
      return `${this.addZero(minutes)}:${this.addZero(seconds)}.${this.addZero(
        millisecond
      )}`
    }

    startTimer() {
      this.elapsedTime = Date.now() - this.startTime
      const time = this.timeToString(this.elapsedTime)
      this.print(time)
    }

    // start 버튼
    start() {
      // 중복 클릭 시 에러 방지를 위해 한번 클리어시킨다.
      // this.interval은 start 시, 계속 생성이 되기 때문에 clear시킨다.
      clearInterval(this.interval)

      // 현재시간 = 현재시간 - 경과된 시간
      this.startTime = Date.now() - this.elapsedTime

      /**
       * this => 전역변수 window를 가리키기 때문에
       * 해당 this를 바인딩 시켜주어 
       * 전역변수 window가 아님을 알려준다.
       */
      this.interval = setInterval(this.startTimer.bind(this), 10)
    }

    // stop 버튼
    stop() {
      clearInterval(this.interval)
    }

    // reset 버튼
    reset() {
      clearInterval(this.interval)
      this.print(this.defaultTime)
      this.startTime = 0
      this.elapsedTime = 0
      this.interval = null
    }
  }

  const get = (target) => {
    return document.querySelector(target)
  }

  const $timer = get('.timer')
  const $startButton = get('.timer_button.start')
  const $stopButton = get('.timer_button.stop')
  const $resetButton = get('.timer_button.reset')

  // stopwatch 인스턴스 생성
  const stopwatch = new Stopwatch($timer)

  $startButton.addEventListener('click', () => {
    stopwatch.start()
  })

  $stopButton.addEventListener('click', () => {
    stopwatch.stop()
  })

  $resetButton.addEventListener('click', () => {
    stopwatch.reset()
  })
})()
