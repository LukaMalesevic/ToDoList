import {deleteProjectBtn, editProjectBtn, projectEditCont, projectHeader, headerInfo, closeForm, form, createProjectButton, projectName, projectDescription, submitForm, projectListContainer, bodyContent} from './DOM'
import { editAllTodos } from './todo';
let projects = [];
let projectButtons = [];
let edit = false;

class Project{

    constructor(name, description)
    {
        this.name = name;
        this.description = description;
    }
}

function createProject()
{   
    form.style.visibility = 'visible';
    bodyContent[0].style.filter = 'blur(10px)';
    bodyContent[0].style.pointerEvents = 'none';
    bodyContent[0].style.userSelect = 'none';
}  

function exitForm()
{
    projectName.value = '';
    projectDescription.value = '';
    form.style.visibility = 'hidden';
    bodyContent[0].style.filter = 'none';
    bodyContent[0].style.pointerEvents = 'auto';
    bodyContent[0].style.userSelect = 'auto';
}

function showProjectsInTheList()
{   
    projectButtons = [];

    while(projectListContainer[0].firstChild)
        projectListContainer[0].removeChild(projectListContainer[0].firstChild);

    projects.forEach(element => {
        let btn = document.createElement('button');
        btn.innerHTML = '➧ ' + element.name;
        btn.classList.add('projects-btn');
        projectListContainer[0].appendChild(btn);
    });

    projectButtons = document.getElementsByClassName('projects-btn');

}

function submitFormBtn()
{
    if(projectName.value != '' && edit === false)
    {
        let p1 = new Project(projectName.value, projectDescription.value);
        projects.push(p1);
        exitForm();

    }else if(projectName.value != '' && edit === true)
    {
        projects.forEach(function(element, id) {
            if(element.name === projectHeader.innerHTML)
            {
                editAllTodos(projectName.value);

                element.name = projectName.value;
                element.description = projectDescription.value;
                edit = false;
                setHeaderAndProjectInfo(id);
                exitForm();
            }
        });
    }

    showProjectsInTheList();
    return projectButtons;
}

function setHeaderAndProjectInfo(id)
{
    projectEditCont.style.visibility = 'visible';
    projectHeader.innerHTML = projects[id].name;
    headerInfo.innerHTML = projects[id].description;
    if(projects[id].description === '')
        headerInfo.innerHTML = '*no description*';
}

function deleteProject()
{
    projects.forEach(function(element, id) {
        if(element.name === projectHeader.innerHTML)
        {
            projects.splice(id, 1);
            
            for(let i = 0; i < projects.length; i++)
            {
                if(projects[i].name != '')
                {
                    projectHeader.innerHTML = projects[i].name;
                    headerInfo.innerHTML = projects[i].description;
                    if(projects[i].description === '')
                    headerInfo.innerHTML = '*no description*';
                    break;
                }
                projectHeader.innerHTML = 'General'
                headerInfo.innerHTML = 'A general list of todos'
            }
            
            if(projects.length === 0)
            {
                projectHeader.innerHTML = 'General'
                headerInfo.innerHTML = 'A general list of todos'
            }
        }
        
    });
}

function editProject()
{
    edit = true;
    projects.forEach(function(element, id) {
        if(element.name === projectHeader.innerHTML)
        {
            createProject();
            projectName.value = element.name;
            projectDescription.value = element.description;

        }
        
    });
}


export {editProject, deleteProject, createProject, exitForm, submitFormBtn, showProjectsInTheList, setHeaderAndProjectInfo}