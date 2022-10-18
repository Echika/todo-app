 let form = document.querySelector('#form');
 let textInput = document.querySelector('#textInput');
 let msg = document.querySelector('#msg');
 let dateInput = document.querySelector('#dateInput');
 let textarea = document.querySelector('#textarea');
 let tasks = document.querySelector('#tasks');
 let add = document.querySelector('#add');

 form.addEventListener('submit', (e) => {
e.preventDefault();
formValidation()
 });

 let formValidation = () => {
    if(textInput.value === ''){
        console.log('failure');
        msg.innerHTML = 'This space should not be left blank';
        msg.style.color = 'red';
    } else {
        console.log('success');
        msg.innerHTML = '';
        acceptData();
        add.setAttribute('data-bs-dismiss', 'modal');
        add.click();

        (() => {
          add.setAttribute('data-bs-dismiss', 'modal')
        })()
    }
 }

 let data = [];

 let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value

  })

  localStorage.setItem('data', JSON.stringify(data))
  console.log(data)

  createTasks();
 }

 let createTasks = () => {
   tasks.innerHTML = ''
  data.map((x, y) => {
    return (tasks.innerHTML += `
   <div id=${y}>
        <span class='fw-bold'>${x.text}</span>
        <span>${x.date}</span>
        <p>${x.description}</p>
        <span class="options">
          <i data-bs-toggle="modal" data-bs-target="#form" onClick = 'editTask(this)' class="fa-solid fa-pen-to-square"></i>
          <i onClick='deleteTask(this); createTasks()' class="fas fa-trash-alt"></i>
        </span>
      </div>
   `
    )

  })
   

   resetForm();
 }

 let resetForm = () => {
  textInput.value = '';
  dateInput.value = '';
  textarea.value = '';
 }

 let deleteTask = (e) => {
   e.parentElement.parentElement.remove();
   data.splice(e.parentElement.parentElement.id, 1);
   localStorage.setItem('data', JSON.stringify(data))
   console.log(data);
 }


 let editTask = (e) => {
   let selectedTask = e.parentElement.parentElement;

   e.parentElement.parentElement.remove();
   textInput.value = selectedTask.children[0].innerHTML;
   dateInput.value = selectedTask.children[1].innerHTML;
   textarea.value = selectedTask.children[2].innerHTML;
    
   deleteTask(e)
 }

 (() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  createTasks();
  console.log(data)
 })()