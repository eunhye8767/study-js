;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  // 데이터를 보내거나 받을 떄 사용하기 때문에 url 변수생성
  const API_URI = 'http://localhost:3000/todos';

  // .todos 앨리먼트
  const $todos = get('.todos');

  // (2) form에 입력한 값 가져오기
  const $form = get('.todo_form');
  const $todoInput = get('.todo_input');

  const createTodoElement = (item) => {
    const { id, content, completed } = item
    const $todoItem = document.createElement('div')
    const isChecked = completed ? 'checked' : ''
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

  // todos 데이터를 렌덩링해주는 함수
  const renderAllTodos = (todos) => {
    // 초기화
    $todos.innerHTML = '';

    /**
     * .todos 영역안에 todos (json)데이터를 넣어준다.
     * http://localhost:3000/todos 의 데이터를 forEach문으로 가져온다.
     * */ 
    todos.forEach( item => {
      //createTodoElement 함수를 호출하여 변수로 받는다.
      const todoElement = createTodoElement(item);
      $todos.appendChild(todoElement);
    });
  }

  // 데이터 불러오는 함수
  const getTodos = () => {
    // fetch 호출
    fetch(API_URI)
      .then(response => response.json())
      .then(todos => renderAllTodos(todos))
      .catch(error => console.error(error));
  }

  // (2) form => submit 이벤트 시 실행할 함수
  const addTodo = (e) => {
    // submit 클릭 시 새로고침되는 기본 이벤트 막기.
    e.preventDefault();

    /**
     * input에 입력한 value 가져오기 => $todoInput.value
     * value 값을 API_URI = 'http://localhost:3000/todos' 로 보내준다.
     */
    const todo = {
      // id는 자동으로 들어간다.
      content: $todoInput.value,
      completed: false,
    }
    fetch(API_URI, {
      method: 'POST',
      headers: {
        // json으로 받아오기
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    .then(getTodos) // todos json 다시불러오기 
    .then(() => {
      $todoInput.value = ''; // input value 초기화
      $todoInput.focus()
    })
    .catch(error => console.error(error))
  } 

  const toggleTodo = (e) => {
    // (3) 클릭시 체크박스일 경우에만 실행
    if (e.target.className !== 'todo_checkbox') return;

    // e.target에서 가장 가까운 .item 클래스 선택
    const $item = e.target.closest('.item');
    const id = $item.dataset.id;
    const completed = e.target.checked;

    /**
     * 참고
     * https://github.com/eunhye8767/__zero-base/tree/master/01_60courses_JS/pj-js-100/case1_todo_list#json-server
     * 
     */
    fetch(`${API_URI}/${id}`, {
      method: 'PATCH',  // 부분적(completed)으로만 변경하기 때문에 PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({completed})
    })
    .then(getTodos)
    .catch(error => console.error(error))
  }

  // (4) 수정하기 함수
  const changeEditMode = (e) => {
    const $item = e.target.closest('.item');
    const $label = $item.querySelector('label');
    const $editInput = $item.querySelector('input[type="text"]');
    const $contentButtons = $item.querySelector('.content_buttons');
    const $editButtons = $item.querySelector('.edit_buttons');
    const value = $editInput.value;

    // 수정버튼
    if (e.target.className === 'todo_edit_button') {
      $label.style.display = 'none';
      $editInput.style.display = 'block';
      $contentButtons.style.display = 'none';
      $editButtons.style.display = 'block';
      
      /**
       * $editInput.focus();
       * => input 앞쪽으로 포커스가 이동이 된다.
       * => input value 제일 끝 글자 뒤로 포커스를 이동할 예정.
       * => const value 변수를 만들어 value 값을 저장한다.
       * => focus이후 value를 초기화 시키고
       * => 저장했던 value 값을 넣어주면 된다.
       */
      $editInput.focus();
      $editInput.value = '';
      $editInput.value = value;
    }
    
    // x 닫기버튼
    if (e.target.className === 'todo_edit_cancel_button') {
      $label.style.display = 'block';
      $editInput.style.display = 'none';
      $contentButtons.style.display = 'block';
      $editButtons.style.display = 'none';

      /**
       * 수정 버튼 클릭 후 확인을 누르지 않고 닫기버튼을 클릭하면
       * 기존의 value 값으로 변경되어야 한다.
       * 기본값은 label 값과 동일하다.
       */
      $editInput.value = $label.innerText;
    }
  }

  // (4) 수정 후 확인 버튼
  const editTodo = (e) => {
    if(e.target.className !== 'todo_edit_confirm_button') return;

    const $item = e.target.closest('.item');
    const id = $item.dataset.id;
    const $editInput = $item.querySelector('input[type="text"]');
    const content = $editInput.value;

    fetch(`${API_URI}/${id}`, {
      method: 'PATCH',  // 부분적(completed)으로만 변경하기 때문에 PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content})
    })
    .then(getTodos)
    .catch(error => console.error(error))
  }

  // (5) 삭제 이벤트
  const removeTodo = (e) => {
    if(e.target.className !== 'todo_remove_button') return;
    
    // 아래처럼 중복되는 코드로 함수로 빼서 적용해도 된다.
    const $item = e.target.closest('.item');
    const id = $item.dataset.id;

    fetch(`${API_URI}/${id}`, {
      method: 'DELETE',  // 삭제 (삭제일 땐, headers, body 필요없음.)
    })
    .then(getTodos)
    .catch(error => console.error(error))
  }

  const init = () => {
    // DOMContentLoaded => HTML 불러오고 분석이 모두 끝난 후 실행
    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
    })

    // (2) form => submit 이벤트, addTodo 함수실행
    $form.addEventListener('submit', addTodo)

    // (3) 체크박스 이벤트
    $todos.addEventListener('click', toggleTodo);

    // (4) 수정하기 이벤트
    $todos.addEventListener('click', changeEditMode);

    // (4) 수정 후 확인 이벤트
    $todos.addEventListener('click', editTodo);

    // (5) 삭제 이벤트
    $todos.addEventListener('click', removeTodo);
  }
  init()
})()
