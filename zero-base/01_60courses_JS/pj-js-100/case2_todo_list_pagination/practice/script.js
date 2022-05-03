;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const $todos = get('.todos')
  const $form = get('.todo_form')
  const $todoInput = get('.todo_input')
  const $pagination = get('.pagination')
  const API_URL = `http://localhost:3000/todos`
  
  const totalCount = 53; // 총 데이터의 갯수(임의지정)
  const pageCount = 5; //화면에 나타날 페이지 갯수
  const limit = 5;
  let currentPage = 1; // 현재페이지(초기값)

  // 페이지 계산 로직 함수 
  // => 첫 로딩시점에 호출 적용
  const pagination = () => {
    // 총 페이지 갯수 계산하기
    let totalPage = Math.ceil(totalCount / limit)

    // 현재 페이지의 그룹 계산하기
    let pageGroup = Math.ceil(currentPage / pageCount)

    // 현재 페이지 그룹의 첫번째/마지막 숫자 구하기
    let lastNumber = pageGroup * pageCount
    if (lastNumber > totalPage) {
      lastNumber = totalPage
    }

    let firstNumber = lastNumber - (pageCount - 1)

    const next = lastNumber + 1
    const prev = firstNumber - 1
    
    let html = '' 
    // data-fn을 이용하여 이전? 다음?을 확인한다.
    if (prev > 0) {
      html += "<button class='prev' data-fn='prev'>이전</button> "
    }

    for (let i = firstNumber; i <= lastNumber; i++) {
      html += `<button class="pageNumber" id="page_${i}">${i}</button>`
    }
    
    if (lastNumber < totalPage) {
      html += `<button class='next' data-fn='next'>다음</button>`
    }

    $pagination.innerHTML = html
    const $currentPageNumber = get(`.pageNumber#page_${currentPage}`)
    $currentPageNumber.style.color = '#9dc0e8'

    const $currentPageNumbers =  document.querySelectorAll(`.pagination button`)
    $currentPageNumbers.forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.fn === 'prev') {
          currentPage = prev
        } else if (button.dataset.fn === 'next') {
          currentPage = next
        } else {
          currentPage = button.innerText
        }
        pagination()
        getTodos()
      })
    })
    // console.log({ lastNumber, firstNumber });
  };

  const createTodoElement = (item) => {
    const { id, content, completed } = item
    const isChecked = completed ? 'checked' : ''
    const $todoItem = document.createElement('div')
    $todoItem.classList.add('item')
    $todoItem.dataset.id = id
    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox' 
                ${isChecked}
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `
    return $todoItem
  }

  const renderAllTodos = (todos) => {
    $todos.innerHTML = ''
    todos.forEach((item) => {
      const todoElement = createTodoElement(item)
      $todos.appendChild(todoElement)
    })
  }

  /**
   * GET /posts?_page=7
   * GET /posts?_page=7&_limit=20
   * 
   * json-server에서 paginate 참고
   * https://github.com/typicode/json-server#paginate
   * 
   * 해당 프로젝트에서는 한 페이지당 5개씩 보여줄 예정.
   * 상단에 변수를 만든다.
   * const limit = 5; 
   * const currentPage = 1;
   */
  const getTodos = () => {
    fetch(`${API_URL}?_page=${currentPage}&_limit=${limit}`)
      .then((response) => response.json())
      .then((todos) => {
        renderAllTodos(todos)
      })
      .catch((error) => console.error(error.message))
  }

  const addTodo = (e) => {
    e.preventDefault()
    const content = $todoInput.value
    if (!content) return
    const todo = {
      content,
      completed: false,
    }
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then(getTodos)
      .then(() => {
        $todoInput.value = ''
        $todoInput.focus()
      })
      .catch((error) => console.error(error.message))
  }

  const toggleTodo = (e) => {
    if (e.target.className !== 'todo_checkbox') return
    const $item = e.target.closest('.item')
    const id = $item.dataset.id
    const completed = e.target.checked
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
      .then((response) => response.json())
      .then(getTodos)
      .catch((error) => console.error(error.message))
  }

  const changeEditMode = (e) => {
    const $item = e.target.closest('.item')
    const $label = $item.querySelector('label')
    const $editInput = $item.querySelector('input[type="text"]')
    const $contentButtons = $item.querySelector('.content_buttons')
    const $editButtons = $item.querySelector('.edit_buttons')
    const value = $editInput.value

    if (e.target.className === 'todo_edit_button') {
      $label.style.display = 'none'
      $editInput.style.display = 'block'
      $contentButtons.style.display = 'none'
      $editButtons.style.display = 'block'
      $editInput.focus()
      $editInput.value = ''
      $editInput.value = value
    }

    if (e.target.className === 'todo_edit_cancel_button') {
      $label.style.display = 'block'
      $editInput.style.display = 'none'
      $contentButtons.style.display = 'block'
      $editButtons.style.display = 'none'
      $editInput.value = $label.innerText
    }
  }

  const editTodo = (e) => {
    if (e.target.className !== 'todo_edit_confirm_button') return
    const $item = e.target.closest('.item')
    const id = $item.dataset.id
    const $editInput = $item.querySelector('input[type="text"]')
    const content = $editInput.value

    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then(getTodos)
      .catch((error) => console.error(error.message))
  }

  const removeTodo = (e) => {
    if (e.target.className !== 'todo_remove_button') return
    const $item = e.target.closest('.item')
    const id = $item.dataset.id

    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(getTodos)
      .catch((error) => console.error(error.message))
  }

  const init = () => {
    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
      pagination();
    })

    $form.addEventListener('submit', addTodo)
    $todos.addEventListener('click', toggleTodo)
    $todos.addEventListener('click', changeEditMode)
    $todos.addEventListener('click', editTodo)
    $todos.addEventListener('click', removeTodo)
  }

  init()
})()
