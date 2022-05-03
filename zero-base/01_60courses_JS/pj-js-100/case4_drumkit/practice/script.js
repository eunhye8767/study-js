;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  const getAll = function (target) {
    return document.querySelectorAll(target)
  }

  const keys = Array.from(getAll('.key'))
  const soundsRoot = 'assets/sounds/'
  const drumSounds = [
    { key: 81, sound: 'clap.wav' },
    { key: 87, sound: 'crash.wav' },
    { key: 69, sound: 'hihat.wav' },
    { key: 65, sound: 'kick.wav' },
    { key: 83, sound: 'openhat.wav' },
    { key: 68, sound: 'ride.wav' },
    { key: 90, sound: 'shaker.wav' },
    { key: 88, sound: 'snare.wav' },
    { key: 67, sound: 'tom.wav' },
  ]

  const getAudioElement = (index) => {
    const audio = document.createElement('audio')
    audio.dataset.key = drumSounds[index].key
    audio.src = soundsRoot + drumSounds[index].sound
    return audio
  }

  // 트랜지션 이벤트가 끝났을 떄 실행하는 함수
  const onTransitionEnd = (e) => {
    /**
     * css - playing 클래스에 transform: scale()이 적용되어 있다.
     * 그리고 key 클래스에 transition 이벤트가 걸려있다.
     */
    if (e.propertyName === 'transform') {
      e.target.classList.remove('playing')
    }
  }

  const onMouseDown = (e) => {
    const keycode = e.target.getAttribute('data-key')
    playSound(keycode)
  }

  const onKeyDown = (e) => {
    const keycode = e.keyCode
    playSound(keycode)
  }

  const playSound = (keycode) => {
    const $audio = get(`audio[data-key="${keycode}"]`)
    const $key = get(`div[data-key="${keycode}"]`)
    if ($key && $audio) {
      $key.classList.add('playing')
      $audio.currentTime = 0
      $audio.play()
    }
  }

  const init = () => {
    window.addEventListener('keydown', onKeyDown)
    keys.forEach((key, index) => {
      const audio = getAudioElement(index)
      key.appendChild(audio)

      // 트랜지션이벤트가 끝났을 때
      key.addEventListener('transitionend', onTransitionEnd)

      key.addEventListener('mousedown', onMouseDown)
      key.dataset.key = drumSounds[index].key
    })
  }

  init()
})()
