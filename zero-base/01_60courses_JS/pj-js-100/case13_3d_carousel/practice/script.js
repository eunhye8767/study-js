;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const carousel = get('.carousel')
  const cellCount = 6 // 아이템 갯수
  let selectedIndex = 0

  const rotateCarousel = () => {
    // 아이템과 반대로 움직여야 해서 -를 곱해준다.
    const angle = (selectedIndex / cellCount) * -360
    carousel.style.transform = 'translateZ(-346px) rotateY(' + angle + 'deg)'
  }

  const prevButton = get('.prev_button')
  prevButton.addEventListener('click', () => {
    selectedIndex--
    rotateCarousel()
  })

  const nextButton = get('.next_button')
  nextButton.addEventListener('click', () => {
    selectedIndex++
    rotateCarousel()
  })
})()
