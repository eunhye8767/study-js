;(function () {
  'use strict'
  const get = (target) => {
    return document.querySelector(target)
  }

  const $button = get('.modal_open_button')
  const $modal = get('.modal')
  const $modalConfirmButton = get('.modal_button.confirm')
  const $modalCancelButton = get('.modal_button.cancel')
  const $body = get('body')

  const toggleModal = () => {
    // toggle 메서드 => 있으면 '추가' 없으면 '삭제'
    $modal.classList.toggle('show')

    /**
     * 모바일, iOS에서는 작동안할 수 있음.
     * css 속성 확인. 
     * 브라으저별 호환성 관련 찾아보고 적용하면 될듯.
     */
    $body.classList.toggle('scroll_lock') 
  }

  $button.addEventListener('click', () => {
    toggleModal()
  })

  $modalConfirmButton.addEventListener('click', () => {
    toggleModal()
  })

  $modalCancelButton.addEventListener('click', () => {
    toggleModal()
  })

  window.addEventListener('click', (e) => {
    // 타겟으로 모달창인지 확인
    if (e.target === $modal) {
      toggleModal()
    }
  })
})()
