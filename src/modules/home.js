import {ToDoContainer, createToDoButton, deleteProjectBtn, editProjectBtn, importantButton, projectHeader, headerInfo } from "./DOM";
import {todoTemplate, todos, showToDosInTheListImportant, showToDosInTheList} from "./todo";
import {isThisWeek, isToday } from "date-fns";

let completeIndex = false;


function generalTab()
{
    projectHeader.innerHTML = 'General';
    headerInfo.innerHTML = 'A general list of todos';
    defaultTabView();

    if(importantButton.innerHTML === 'All')
    showToDosInTheList();
    else if(importantButton.innerHTML === 'Important')
    showToDosInTheListImportant();

    createToDoButton.style.visibility = 'visible';
    importantButton.style.visibility = 'visible';

}

function todayTab()
{
    projectHeader.innerHTML = 'Today';
    headerInfo.innerHTML = 'All todos dated today';
    defaultTabView();
    showToDosInTheListForTodayTab();
}

function upcomingTab()
{
    projectHeader.innerHTML = 'Upcoming';
    headerInfo.innerHTML = 'All upcoming todos in the next week';
    defaultTabView();
    showToDosInTheListForUpcomingTab();
}

function completedTab()
{
    projectHeader.innerHTML = 'Completed';
    headerInfo.innerHTML = 'All completed todos';
    defaultTabView();
    showToDosInTheListForCompletedTab();
}

function trashTab()
{
    projectHeader.innerHTML = 'Trash';
    headerInfo.innerHTML = 'All deleted todos and projects';
    defaultTabView();
    showToDosInTheList();
}

function defaultTabView(){

    deleteProjectBtn.style.visibility = 'hidden';
    editProjectBtn.style.visibility = 'hidden';
    createToDoButton.style.visibility = 'hidden';
    importantButton.style.visibility = 'hidden';
}

function reverseComplete()
{
    if(projectHeader.innerHTML === 'Completed' && completeIndex === false)
    {
        todos.forEach(element => {

            if(element.completed)
            element.completed = false;
            else if(!element.completed)
            element.completed = true;
            
        });
        showToDosInTheListForCompletedTab();
        completeIndex = true;

    }else if(projectHeader.innerHTML != 'Completed' && completeIndex === true)
    {
        todos.forEach(element => {

            if(element.completed)
            element.completed = false;
            else if(!element.completed)
            element.completed = true;
            
        });

        if(projectHeader.innerHTML === 'Today')
        showToDosInTheListForTodayTab();
        else if(projectHeader.innerHTML === 'Upcoming')
        showToDosInTheListForUpcomingTab();
        else if(projectHeader.innerHTML === 'General')
        generalTab();

        completeIndex = false;
    }

}

function showToDosInTheListForCompletedTab()
{
    while(ToDoContainer.firstChild)
    ToDoContainer.removeChild(ToDoContainer.firstChild);

    ToDoContainer.innerHTML = '';

    todos.forEach(element => {
        if(element.completed === false)
        {
            ToDoContainer.innerHTML += todoTemplate(element.name, element.date, element.important);
        }
    });
}

function showToDosInTheListForUpcomingTab()
{
    while(ToDoContainer.firstChild)
    ToDoContainer.removeChild(ToDoContainer.firstChild);

    ToDoContainer.innerHTML = '';

    todos.forEach(element => {
        if(!isToday(element.date) && isThisWeek(element.date) && element.completed === false)
        {
            ToDoContainer.innerHTML += todoTemplate(element.name, element.date, element.important);
        }
    });
}

function showToDosInTheListForTodayTab()
{
    while(ToDoContainer.firstChild)
    ToDoContainer.removeChild(ToDoContainer.firstChild);

    ToDoContainer.innerHTML = '';

    todos.forEach(element => {
        if(isToday(element.date) && element.completed === false)
        {
            ToDoContainer.innerHTML += todoTemplate(element.name, element.date, element.important);
        }
    });
}
export {
    generalTab, todayTab, upcomingTab, completedTab, trashTab, reverseComplete, showToDosInTheListForTodayTab
    , showToDosInTheListForUpcomingTab , showToDosInTheListForCompletedTab
}