console.log("Hello there!")

const btn = document.getElementById("btn");
btn.addEventListener("click", function() {
  console.log("hello");
});

function getAllTodos() {
  fetch('/api/todos')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
}

getAllTodos();

function renderTodos (todos) {
  let div = document.getElementById("todos");
  const todoDom = todos.map((todo) => {
    return `${todo}`
  })
}

renderTodos()