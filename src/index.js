import './style.css';

import {editProject, deleteProject, setHeaderAndProjectInfo, submitFormBtn, exitForm, createProject, showProjectsInTheList } from './modules/project';
import {submitToDoForm, createToDoButton, exitToDoForm, editProjectBtn, deleteProjectBtn, submitForm, closeForm, createProjectButton, importantButton } from './modules/DOM'
import { createCompleteToDosArray, showOnlyImportant, deleteAllToDoInProject, createDeleteToDosArray, deleteToDo, deleteTodos, showToDosInTheList, submitToDoFormBtn, createToDo, exitToDo, createEditToDosArray } from './modules/todo';
import { reverseComplete,generalTab, todayTab, upcomingTab, completedTab, trashTab } from './modules/home';
import { buttonGeneral, buttonToday, buttonCompleted, buttonUpcoming, buttonTrash } from './modules/DOM';

let projButtons = [];

createProjectButton.addEventListener('click', ()=>{
    createProject();
});

closeForm.addEventListener('click', ()=>{
    exitForm();
});

submitForm.addEventListener('click', ()=>{
    projButtons = submitFormBtn();
    projButtons = Array.from(projButtons);

    projButtons.forEach(function(btn, id) {
        btn.addEventListener('click', function() {
            deleteProjectBtn.style.visibility = 'visible';
            editProjectBtn.style.visibility = 'visible';
            createToDoButton.style.visibility = 'visible';
            importantButton.style.visibility = 'visible';
            setHeaderAndProjectInfo(id);
            showToDosInTheList();
        });
    });
   
});

deleteProjectBtn.addEventListener('click', ()=>{
    deleteAllToDoInProject();
    deleteProject();
    showToDosInTheList();

    projButtons = submitFormBtn();
    projButtons = Array.from(projButtons);

    projButtons.forEach(function(btn, id) {
        btn.addEventListener('click', function() {
            setHeaderAndProjectInfo(id);
            showToDosInTheList();
        });
    });
});

editProjectBtn.addEventListener('click', ()=>{
    editProject();
});

createToDoButton.addEventListener('click', ()=>{
    createToDo();
});

exitToDoForm.addEventListener('click', ()=>{
    exitToDo();
});

submitToDoForm.addEventListener('click', ()=>{
    submitToDoFormBtn();
});

document.addEventListener('click', ()=>{
    createDeleteToDosArray();
    createEditToDosArray();
    createCompleteToDosArray();
    reverseComplete();
});

importantButton.addEventListener('click', ()=>{
    showOnlyImportant();
});

buttonGeneral.addEventListener('click', ()=>{
    generalTab();
});

buttonToday.addEventListener('click', ()=>{
    todayTab();
});

buttonUpcoming.addEventListener('click', ()=>{
    upcomingTab();
});

buttonCompleted.addEventListener('click', ()=>{
    completedTab();
});

buttonTrash.addEventListener('click', ()=>{
    trashTab();
});

