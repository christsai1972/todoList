let section = document.querySelector("section");
let add = document.querySelector("form button");
let sortButton = document.querySelector("div.sort button");

add.addEventListener("click", (e) => {
  // prevent form from being submitted
  e.preventDefault();
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  if (todoText === "") return;
  CreateRecord(todoText, todoMonth, todoDate, "add");
  form.children[0].value = "";

  // create an object for array
  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };
  // store data into an array by object
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }
});

sortButton.addEventListener("click", () => {
  let body = section.parentElement;
  section.remove();
  section = document.createElement("section");
  body.appendChild(section);
  LoadRecord();
  console.log(body);
});

LoadRecord();

function LoadRecord() {
  let myList = localStorage.getItem("list");
  if (myList != null) {
    let myListArray = mergeSort(JSON.parse(myList));

    myListArray.forEach((item) => {
      CreateRecord(item.todoText, item.todoMonth, item.todoDate, "restored");
    });
  }
}

function CreateRecord(todoText, todoMonth, todoDate, type) {
  //   create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + " /" + todoDate;
  todo.appendChild(text);
  todo.appendChild(time);
  // Create green check and red trash can
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    console.log(todoItem);
    todoItem.addEventListener("animationend", () => {
      todoItem.remove();
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
  });
  if (type == "add") todo.style.animation = "scaleUp 0.3s forwards";

  todo.appendChild(completeButton);
  todo.appendChild(trashButton);
  section.appendChild(todo);
}

function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
      if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

function mergeSort(arr) {
  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);

    return mergeTime(mergeSort(right), mergeSort(left));
  }
}
