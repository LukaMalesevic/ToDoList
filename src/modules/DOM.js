const createProjectButton = document.getElementById('create-project')
const projectName = document.getElementById('pr-name');
const projectDescription = document.getElementById('pr-desc');
const submitForm = document.getElementById('submit');
const projectListContainer = document.getElementsByClassName('projects-list');
const form = document.getElementById('create-project-form');
const closeForm = document.getElementById('x');
const bodyContent = document.getElementsByClassName('content');
const projectHeader = document.getElementById('header');
const headerInfo = document.getElementById('header-info');
const projectEditCont= document.getElementById('project-edit-cont');
const deleteProjectBtn = document.getElementById('trash-btn');
const editProjectBtn = document.getElementById('edit-btn');

const ToDoContainer = document.getElementById('todo-container')
const ToDoForm = document.getElementById('create-todo-form');
const ToDoName = document.getElementById('todo-name');
const ToDoCalendar = document.getElementById('calendar');
const importantButton = document.getElementById('all-impo');
const createToDoButton = document.getElementById('create-todo');
const exitToDoForm = document.getElementById('x-todo');
const submitToDoForm = document.getElementById('submit-todo');
const importantCheckbox = document.getElementById('imp-checkbox');

const buttonGeneral = document.getElementById('general');
const buttonToday = document.getElementById('today');
const buttonUpcoming = document.getElementById('upcoming');
const buttonCompleted = document.getElementById('completed');
const buttonTrash = document.getElementById('trash');


export {buttonGeneral, buttonToday,buttonUpcoming, buttonCompleted, buttonTrash, importantCheckbox, ToDoContainer, ToDoName, ToDoCalendar, ToDoForm, exitToDoForm, submitToDoForm, importantButton, createToDoButton, deleteProjectBtn, editProjectBtn, projectEditCont, closeForm, createProjectButton, projectName, projectDescription,
submitForm, projectListContainer, bodyContent, form, headerInfo, projectHeader}
