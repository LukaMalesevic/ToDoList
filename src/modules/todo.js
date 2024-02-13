import {importantCheckbox, ToDoContainer, projectHeader, ToDoName, ToDoCalendar, bodyContent, ToDoForm, exitToDoForm, submitToDoForm, importantButton, createToDoButton } from "./DOM";
import {isThisWeek, isToday } from "date-fns";
import {generalTab, showToDosInTheListForUpcomingTab, showToDosInTheListForTodayTab, showToDosInTheListForCompletedTab } from "./home";
let todos = [];
let deleteTodos = [];
let editTodos = [];
let completeTodos = [];
let editToDo = false;
let editIndex;


class Todo{

    constructor(project, name, date, important)
    {
        this.project = project;
        this.name = name;
        this.date = date;
        this.important = important;
        this.completed = false;
    }
}

function createToDo()
{   
    ToDoForm.style.visibility = 'visible';
    bodyContent[0].style.filter = 'blur(10px)';
    bodyContent[0].style.pointerEvents = 'none';
    bodyContent[0].style.userSelect = 'none';
}  

function exitToDo()
{
    ToDoName.value = '';
    ToDoCalendar.value = '';
    importantCheckbox.checked = false;
    ToDoForm.style.visibility = 'hidden';
    bodyContent[0].style.filter = 'none';
    bodyContent[0].style.pointerEvents = 'auto';
    bodyContent[0].style.userSelect = 'auto';
}

function submitToDoFormBtn()
{

    if(ToDoName.value != '' && ToDoCalendar.value != '' && editToDo === false)
    {
        let t1 = new Todo(projectHeader.innerHTML, ToDoName.value, ToDoCalendar.value, importantCheckbox.checked);
        todos.push(t1);
        exitToDo();
        if(projectHeader.innerHTML === 'General')
        generalTab();

    }else if(ToDoName.value != '' && ToDoCalendar.value != '' && editToDo === true)
    {
        todos[editIndex].name = ToDoName.value;
        todos[editIndex].date = ToDoCalendar.value;
        todos[editIndex].important = importantCheckbox.checked;

        exitToDo();
        editToDo = false;
    }
    if(importantButton.innerHTML === 'All' && importantButton.style.visibility === 'visible')
    showToDosInTheList();
    else if(importantButton.innerHTML === 'Important' && importantButton.style.visibility === 'visible')
    showToDosInTheListImportant();
    else if(projectHeader.innerHTML === 'Today')
    showToDosInTheListForTodayTab();
    else if(projectHeader.innerHTML === 'Upcoming')
    showToDosInTheListForUpcomingTab();
    else if(projectHeader.innerHTML === 'Completed')
    showToDosInTheListForCompletedTab();
}

function createEditToDosArray()
{
    editTodos = document.getElementsByClassName('edit-btn-todo');
    editTodos = Array.from(editTodos);

    editTodos.forEach(function(btn, id) {
        btn.addEventListener('click', function() {
            if(importantButton.innerHTML === 'All' && importantButton.style.visibility === 'visible')
            {
                editToDoFunc(id);
                showToDosInTheList();
            }
            else if(importantButton.innerHTML === 'Important' && importantButton.style.visibility === 'visible')
            {
                editToDoFuncImportant(id);
                showToDosInTheListImportant();
            }else if(projectHeader.innerHTML === 'Today')
            {
                editToDoFuncToday(id);
                showToDosInTheListForTodayTab();
            }else if(projectHeader.innerHTML === 'Upcoming')
            {
                editToDoFuncUpcoming(id);
                showToDosInTheListForUpcomingTab();
            }else if(projectHeader.innerHTML === 'Completed')
            {
                editToDoFuncCompleted(id);
                showToDosInTheListForCompletedTab();
            }
        });
    });
}

function createCompleteToDosArray()
{
    completeTodos = document.getElementsByClassName('completed-checkbox');
    completeTodos = Array.from(completeTodos);

    completeTodos.forEach(function(btn, id) {
        btn.addEventListener('click', function() {
            if(importantButton.innerHTML === 'All' && importantButton.style.visibility === 'visible')
            {
                completeTodo(id)
                showToDosInTheList();
            }
            else if(importantButton.innerHTML === 'Important' && importantButton.style.visibility === 'visible')
            {
                completeTodoImportant(id);
                showToDosInTheListImportant();
            }else if(projectHeader.innerHTML === 'Today')
            {
                completeToDoToday(id);
                showToDosInTheListForTodayTab();
            }else if(projectHeader.innerHTML === 'Upcoming')
            {
                completeToDoUpcoming(id);
                showToDosInTheListForUpcomingTab();
            }else if(projectHeader.innerHTML === 'Completed')
            {   
                completeTodoCompleted(id);
                showToDosInTheListForCompletedTab();
            }
        });
    });
}

function createDeleteToDosArray()
{
    deleteTodos = document.getElementsByClassName('trash-btn-todo');
    deleteTodos = Array.from(deleteTodos);

    deleteTodos.forEach(function(btn, id) {
        btn.addEventListener('click', function() {
            if(importantButton.innerHTML === 'All' && importantButton.style.visibility === 'visible')
            {
                deleteToDo(id);
                showToDosInTheList();
            }
            else if(importantButton.innerHTML === 'Important' && importantButton.style.visibility === 'visible')
            {
                deleteToDoImportant(id);
                showToDosInTheListImportant();
            }else if(projectHeader.innerHTML === 'Today')
            {
                deleteToDoToday(id);
                showToDosInTheListForTodayTab();
            }else if(projectHeader.innerHTML === 'Upcoming')
            {
                deleteToDoUpcoming(id);
                showToDosInTheListForUpcomingTab();
            }else if(projectHeader.innerHTML === 'Completed')
            {   
                deleteToDoCompleted(id);
                showToDosInTheListForCompletedTab();
            }
        });
    });
}

function showToDosInTheList()
{
    while(ToDoContainer.firstChild)
    ToDoContainer.removeChild(ToDoContainer.firstChild);

    ToDoContainer.innerHTML = '';

    todos.forEach(element => {
        if(element.project === projectHeader.innerHTML && element.completed === false)
        {
            ToDoContainer.innerHTML += todoTemplate(element.name, element.date, element.important);
        }
    });
}

function showToDosInTheListImportant()
{
    while(ToDoContainer.firstChild)
    ToDoContainer.removeChild(ToDoContainer.firstChild);

    ToDoContainer.innerHTML = '';

    todos.forEach(element => {
        if(element.project === projectHeader.innerHTML && element.important === true && element.completed === false)
        {
            ToDoContainer.innerHTML += todoTemplate(element.name, element.date, element.important);
        }
    });
}

function todoTemplate(title, date, important)
{
    let string = '<div class="todo">' +
    ' <div class="leftContainer"> ';

    if(important)
    string +='<div class="important-sticker"><p class="imp-txt">Important</p></div>';
    
    string += '<input class="completed-checkbox" type="checkbox">' +
    '<h3>'+ title +'</h3>'+
    '</div>'+
    '<div class="rightContainer">'+
    '<h3>' + date + '</h3>'+
    `<button class="edit-btn-todo edit" ><svg class="todo-svg" width='24' height='24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/><g transform="matrix(0.4 0 0 0.4 12 12)" ><path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-27.01, -25)" d="M 4 0 L 4 48 L 21 48 C 21.359375 48.003906 21.695313 47.816406 21.878906 47.503906 C 22.058594 47.191406 22.058594 46.808594 21.878906 46.496094 C 21.695313 46.183594 21.359375 45.996094 21 46 L 6 46 L 6 2 L 24 2 L 24 16 L 38 16 L 38 27 C 37.996094 27.359375 38.183594 27.695313 38.496094 27.878906 C 38.808594 28.058594 39.191406 28.058594 39.503906 27.878906 C 39.816406 27.695313 40.003906 27.359375 40 27 L 40 14.59375 L 39.71875 14.28125 L 25.71875 0.28125 L 25.40625 0 Z M 26 3.4375 L 36.5625 14 L 26 14 Z M 45.90625 24.90625 C 44.855469 24.90625 43.800781 25.292969 43 26.09375 L 42.3125 26.8125 L 42.34375 26.84375 L 26.90625 42.28125 C 26.777344 42.398438 26.679688 42.550781 26.625 42.71875 L 24.9375 48.71875 C 24.835938 49.066406 24.925781 49.441406 25.179688 49.703125 C 25.433594 49.960938 25.804688 50.0625 26.15625 49.96875 L 32.15625 48.375 C 32.324219 48.320313 32.476563 48.222656 32.59375 48.09375 L 48.40625 32.40625 C 48.53125 32.296875 48.628906 32.15625 48.6875 32 L 48.8125 31.90625 C 50.414063 30.304688 50.414063 27.695313 48.8125 26.09375 C 48.011719 25.292969 46.957031 24.90625 45.90625 24.90625 Z M 43.75 28.25 L 46.75 31.25 L 31.40625 46.5 L 28.46875 43.65625 L 28.5 43.53125 Z" stroke-linecap="round" /></g></svg></button>`+
    `<button class="trash-btn-todo edit" ><svg class="todo-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>`+
    '</div>'+ '</div>';

    return string;
}

function deleteToDo(id)
{
    todos.forEach(function(element,idx) {
        if(element.project === projectHeader.innerHTML &&element.completed === false)
        {
            id--;
            if(id === -1)
            {
                todos.splice(idx, 1);
            }
        }
    });
}

function deleteToDoImportant(id)
{
    todos.forEach(function(element,idx) {
        if(element.project === projectHeader.innerHTML && element.important === true && element.completed === false)
        {
            id--;
            if(id === -1)
            {
                todos.splice(idx, 1);
            }
        }
    });
}

function deleteToDoToday(id)
{
    todos.forEach(function(element,idx) {
        if(isToday(element.date) === true && element.completed === false)
        {
            id--;
            if(id === -1)
            {
                todos.splice(idx, 1);
            }
        }
    });   
}

function deleteToDoUpcoming(id)
{
    todos.forEach(function(element,idx) {
        if(isToday(element.date) === false && isThisWeek(element.date) === true && element.completed === false)
        {
            id--;
            if(id === -1)
            {
                todos.splice(idx, 1);
            }
        }
    });   
}

function deleteToDoCompleted(id)
{
    todos.forEach(function(element,idx) {
        if(element.completed === false)
        {
            id--;
            if(id === -1)
            {
                todos.splice(idx, 1);
            }
        }
    }); 
}

function deleteAllToDoInProject()
{
    todos.forEach(function(element,idx) {
        if(element.project === projectHeader.innerHTML && element.completed === false)
        {
            todos.splice(idx, 1);
        }
    });

}
function editToDoFunc(id)
{
    editToDo = true;
    todos.forEach(function(element,idx) {
    if(element.project === projectHeader.innerHTML && element.completed === false)
        {
            id--;
            if(id === -1)
            {
                editIndex = idx;
                createToDo();
                ToDoName.value = element.name;
                ToDoCalendar.value = element.date;
                importantCheckbox.checked = element.important;
                
            }
        }
    }); 
}

function editToDoFuncImportant(id)
{
    editToDo = true;
    todos.forEach(function(element,idx) {
    if(element.project === projectHeader.innerHTML && element.important === true && element.completed === false)
        {
            id--;
            if(id === -1)
            {
                editIndex = idx;
                createToDo();
                ToDoName.value = element.name;
                ToDoCalendar.value = element.date;
                importantCheckbox.checked = element.important;
                
            }
        }
    });   
}

function editToDoFuncToday(id)
{
    editToDo = true;
    todos.forEach(function(element,idx) {
    if(isToday(element.date) === true && element.completed === false)
        {
            id--;
            if(id === -1)
            {
                editIndex = idx;
                createToDo();
                ToDoName.value = element.name;
                ToDoCalendar.value = element.date;
                importantCheckbox.checked = element.important;
                
            }
        }
    });   
}

function editToDoFuncUpcoming(id)
{
    editToDo = true;
    todos.forEach(function(element,idx) {
    if(isToday(element.date) === false && isThisWeek(element.date) === true && element.completed === false)
        {
            id--;
            if(id === -1)
            {
                editIndex = idx;
                createToDo();
                ToDoName.value = element.name;
                ToDoCalendar.value = element.date;
                importantCheckbox.checked = element.important;
                
            }
        }
    });   
}

function editToDoFuncCompleted(id)
{
    editToDo = true;
    todos.forEach(function(element,idx) {
    if(element.completed === false)
        {
            id--;
            if(id === -1)
            {
                editIndex = idx;
                createToDo();
                ToDoName.value = element.name;
                ToDoCalendar.value = element.date;
                importantCheckbox.checked = element.important;
                
            }
        }
    }); 
}


function editAllTodos(name)
{
    todos.forEach(function(element,idx) {
        if(element.project === projectHeader.innerHTML)
        {
            element.project = name;
        }
    });

}

function showOnlyImportant()
{
    if(importantButton.innerHTML === 'All' && importantButton.style.visibility === 'visible')
    {
        showToDosInTheListImportant();
        importantButton.innerHTML = 'Important';

    }else if(importantButton.innerHTML === 'Important' && importantButton.style.visibility === 'visible')
    {
        showToDosInTheList();
        importantButton.innerHTML = 'All';
    }
}

function completeToDoToday(id)
{
    todos.forEach(function(element,idx) {
        if(isToday(element.date) && element.completed === false)
        {
        id--;
        if(id === -1)
        {
            if(element.completed)
            element.completed = false;
            else if(!element.completed)
            element.completed = true;
        }
        }
        }); 
}

function completeToDoUpcoming(id)
{
    todos.forEach(function(element,idx) {
        if(!isToday(element.date) && isThisWeek(element.date) && element.completed === false)
        {
        id--;
        if(id === -1)
        {
            if(element.completed)
            element.completed = false;
            else if(!element.completed)
            element.completed = true;
        }
        }
        }); 
}

function completeTodoImportant(id)
{
    todos.forEach(function(element,idx) {
        if(element.project === projectHeader.innerHTML && element.important === true && element.completed === false)
        {
        id--;
        if(id === -1)
        {
            if(element.completed)
            element.completed = false;
            else if(!element.completed)
            element.completed = true;
        }
        }
        });   
}

function completeTodoCompleted(id)
{
    todos.forEach(function(element,idx) {
        if(element.completed === false)
        {
            
        id--;
        if(id === -1)
        {
            if(element.completed)
            element.completed = false;
            else if(!element.completed)
            element.completed = true;
        }
        }
        });
}

function completeTodo(id)
{
    todos.forEach(function(element,idx) {
        if(element.project === projectHeader.innerHTML && element.completed === false)
        {
        id--;
        if(id === -1)
        {
            if(element.completed)
            element.completed = false;
            else if(!element.completed)
            element.completed = true;
        }
        }
        });   
}


export {createCompleteToDosArray, todos, todoTemplate, showToDosInTheListImportant, showOnlyImportant, editAllTodos,deleteAllToDoInProject, createEditToDosArray, createDeleteToDosArray, deleteToDo, deleteTodos, showToDosInTheList, submitToDoFormBtn, createToDo, exitToDo}