/**
 * ## 화살표 함수로도 가능한 즉시 실행 함수
 * ;(() => {
 * })()
 */

;(function () {
  'use strict'

  // document.querySelector를 함수로 미리 선언 => 유틸함수
  const get = (target) => document.querySelector(target)

  // 시작 함수
  const init = () => {
    get('form').addEventListener('submit', (e) => {
      playGame(e);
    })
    setPassword()
  }

  // 야구 게임 옵션
  const baseball = {
    limit: 10,   // 최대시도횟수 10번
    digit: 4,    // 4자리
    trial: 0,    // 시도횟수(초기값)
    end: false,  // 끝나지 않음(초기값)
    $question: get('.ball_question'),
    $answer: get('.ball_answer'),
    $input: get('.ball_input'),
  }

  // 구조분해할당(디스트럭쳐링)으로 각 객체 선언
  const { limit, digit, $question, $answer, $input } = baseball;
  // 단, 값이 바뀌는 경우 let으로 선언
  let { trial, end } = baseball;

  const setPassword = () => {
    /**
     * ## 패스워드를 지정해준다.(패스워드 생성)(랜덤으로)
     */

    // Array로 배열을 만들고 그 안에 값을 false로 채워준다.
    const gameLimit = Array(limit).fill(false)
    let password = ''
    while (password.length < digit) {

      // 랜덤으로 0~9까지, 10진수(2번째 인자에 표기) 
      const random = parseInt(Math.random() * 10, 10)

      if (gameLimit[random]) {
        continue
      }
      password += random

      // gameLimit배열의 값을 false에서 true로 변경
      gameLimit[random] = true
    }

    baseball.password = password
  }

  const onPlayed = (number, hint) => {
    /**
     * ## 시도를 했을 때
     * 
     * number : 내가 입력한 숫자
     * hint : 현재 상항
     */
    return `<em>${trial}차시도</em> : ${number}, ${hint}`
  }

  const isCorrect = (number, answer) => {
    /** 
     * ## 번호가 같을 때
     */ 
    return number === answer
  }

  const isDuplicate = (number) => {
    /**
     * ## 중복 번호가 있을 때
     * 
     * new Set() 
     * => 새로운 배열을 중복없이 반환하는 Set의 사용예제
     */
    return [...new Set(number.split(''))].length !== digit
  }

  const getStrikes = (number, answer) => {
    /**
     * ## 스트라이크 카운트 몇 개?
     */
    let strike = 0
    const nums = number.split('')

    nums.map((digit, index) => {
      if (digit === answer[index]) {
        strike++
      }
    })

    return strike
  }
  
  const getBalls = (number, answer) => {
    /**
     * ## 볼 카운트 몇 개?
     */

    let ball = 0
    const nums = number.split('')
    const gameLimit = Array(limit).fill(false)

    answer.split('').map((num) => {
      gameLimit[num] = true
    })

    nums.map((num, index) => {
      if (answer[index] !== num && !!gameLimit[num]) {
        ball++
      }
    })

    return ball
  }

  const getResult = (number, answer) => {
    /**
     * ## 시도에 따른 결과는?
     */
    if (isCorrect(number, answer)) {
      end = true
      $answer.innerHTML = baseball.password
      return '홈런!!'
    }

    const strikes = getStrikes(number, answer)
    const balls = getBalls(number, answer)

    return 'STRIKE: ' + strikes + ', BALL: ' + balls
  }

  const playGame = (e) => {
    /**
     * ## 게임 플레이
     */
    e.preventDefault();

    if (!!end) {
      return
    }

    // 구조분해할당으로 $input을 바로 쓸 수 있다.
    const inputNumber = $input.value
    const { password } = baseball

    if (inputNumber.length !== digit) {
      alert(`${digit}자리 숫자를 입력해주세요.`)
    } else if (isDuplicate(inputNumber)) {
      alert('중복 숫자가 있습니다.')
    } else {
      trial++
      
      // result에 onPlayed = (number, hint) 값을 넘겨준다.
      const result = onPlayed(inputNumber, getResult(inputNumber, password))
      $question.innerHTML += `<span>${result}</span>`

      if (limit <= trial && !isCorrect(inputNumber, password)) {
        alert('쓰리아웃!')
        end = true
        $answer.innerHTML = password
      }
    }

    $input.value = ''
    $input.focus()
  }

  init();
})()
