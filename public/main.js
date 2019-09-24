console.log("Hello there!")

const btn = document.getElementById("btn");
btn.addEventListener("click", function() {
  const todoString = document.getElementById("input-txt").value

  const promise = postData('/api/todos', {todo: todoString})

  promise.then(function(res) {
    renderTodos(res)
  })
});

function getAllTodos() {
  fetch('/api/todos')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      renderTodos(myJson);
    });
}

getAllTodos();

function renderTodos (todos) {
  let div = document.getElementById("todos");
  const todoDom = todos.map((data) => {
    return `<div>${data.todo}</div>`
  })
  div.innerHTML = todoDom.join("")
}

function postData(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
}