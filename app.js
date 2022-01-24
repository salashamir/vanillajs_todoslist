// get a reference to add form
const addForm = document.querySelector(".add");
// reference to ul so we can inject new items into it
const list = document.querySelector(".todos");
// reference for clear button
const clear = document.querySelector(".btn-clear");
// search field refrence
const search = document.querySelector(".search input");
// hidden red alert
const redAlert = document.querySelector(".alert-red");
const greenAlert = document.querySelector(".alert-green");

// hidden green alert

// function to make this action reusable so code can be extended in future
const generateTemplate = function (todo) {
  const html = `<li class="list-item">
  <div>
    <p class="p">${todo}</p>
  </div>
  <div>
    <i class="fas fa-check check"></i>
    <i class="far fa-edit edit"></i>
    <i class="far fa-trash-alt delete"></i>
  </div>
</li>`;
  list.innerHTML += html;
};
// function to do display alert for a set amount of time
const displayRedAlert = function () {
  redAlert.classList.toggle("none");
  setTimeout(() => {
    redAlert.classList.toggle("none");
  }, 1000);
};

const displayGreenAlert = function () {
  greenAlert.classList.toggle("none");
  setTimeout(() => {
    greenAlert.classList.toggle("none");
  }, 1000);
};

// attach event listener
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get what user typed with spaces trimmed
  const todo = addForm.add.value.trim();
  if (todo) {
    generateTemplate(todo);
    displayGreenAlert();
    addForm.reset();
  }
});

// to delete items use event delegation instead of attaching event litener to every single trashcan added
// delete todos:
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // navigate/traverse to li tag that is parent of delete icon
    e.target.parentElement.parentElement.remove();
    displayRedAlert();
  } else if (e.target.classList.contains("edit")) {
    e.target.classList.toggle("edit-active");
    e.target.parentElement.previousElementSibling.children[0].toggleAttribute(
      "contenteditable"
    );
  } else if (e.target.classList.contains("check")) {
    e.target.classList.toggle("check-active");
    e.target.parentElement.previousElementSibling.children[0].classList.toggle(
      "strike"
    );
  }
});

// clearing todo list
clear.addEventListener("click", () => {
  list.innerHTML = "";
});

// function for keyup filtering in search:
// will take  in term
const filterTodos = function (term) {
  // check to see if we're on right track
  // console.log(list.children);
  // console.log(Array.from(list.children));
  // then cycle through array returned from filter using foreach: chaining Array.from().filter().foreach()
  // we want ones that dont have a match to apply class to them
  // textContent proeprty on LI will look for text anywhere in li exlamation mark to negate and return a list of only falses aka non-matches
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => {
      // apply class to hide them for each one
      todo.classList.add("filtered");
    });

  // this time we want ones that do match, to remove filtered class when they match, because if we delete a character and go back to matching then the filtered class above will still be on something that may match
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => {
      // apply class to hide them for each one
      todo.classList.remove("filtered");
    });
  // list.children will return HTMLcollection and we cant use array methods directly on it... convert it to array
  // filter through the todos and apply classes to the ones we dont want to show, the ones which dont have a match w our term
  // we're going to use filter method, but first we need a list of our todos...
  // we already have reference to list which contains all the todos.. we want a list of li tags
};
// keyup event for searching/filtering
// get reference on search input field because we're listening for keyup events directly on input field
// done above
search.addEventListener("keyup", () => {
  // 1) get term that user is typing in, we get the term eveyr time they type a new key
  const term = search.value.trim().toLowerCase();
  // 2) write function that will take this term, match it aginst the todos and filter them
  filterTodos(term);
});
