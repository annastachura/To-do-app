"use strict";


const Json2 = localStorage.getItem('Data');
const Json4 = localStorage.getItem('Data2');


var tasks = JSON.parse(Json2);
if (tasks == null) {
    tasks = [];
}
var completedTasks = JSON.parse(Json4);
if (completedTasks == null) {
    completedTasks = [];
}

function completeTask(taskId) {
    var task = tasks[taskId]
    tasks.splice(taskId, 1)
    completedTasks.push(task);
    showTasks();
    const Json3 = JSON.stringify(completedTasks);
    localStorage.setItem('Data2', Json3);
    const Json = JSON.stringify(tasks);
    localStorage.setItem('Data', Json);

}


function deleteTask(taskId) {
    tasks.splice(taskId, 1)
    showTasks();
    const Json = JSON.stringify(tasks);
    localStorage.setItem('Data', Json);
}

function addNewTask(title) {
    tasks.push(title);
    showTasks();
    const Json = JSON.stringify(tasks);
    localStorage.setItem('Data', Json);
}

function showTasks() {
    const answer = document.querySelector('.answer--js');
    answer.innerHTML = "";
    tasks.forEach(function(title) {

        var taskLi = document.createElement('li');
        taskLi.classList.add("box");
        taskLi.innerHTML +=
            `
        <button class="answer__done answer__done--js">✓</button>
        <input class = "waitInput" value="${title}"> </input>
        <button class="answer__wrong answer__wrong--js">X</button>`


        answer.appendChild(taskLi);
        const answer__done = taskLi.querySelector('.answer__done--js');

        answer__done.addEventListener('click', function() {
            const taskIndex = tasks.indexOf(title);
            completeTask(taskIndex);
        });

        const wrong__button = taskLi.querySelector('.answer__wrong--js');
        wrong__button.addEventListener('click', function() {
            const taskIndex = tasks.indexOf(title);
            deleteTask(taskIndex);
        });

    });
    const completedList = document.querySelector('.done--js');
    completedList.innerHTML = ("");
    completedTasks.forEach(function(title) {
        var newElement = document.createElement('li');
        newElement.innerHTML += ` <p>${title}</p>`
        completedList.appendChild(newElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    showTasks();
});

const input = document.querySelector('.task__name--js');

const task__button = document.querySelector('.task__button--js');
task__button.addEventListener('click', function() {

    if (input.value) {
        addNewTask(input.value);
        input.value = "";
    }
});
input.addEventListener('keyup', function(e) {
    if (input.value && e.keyCode === 13) {
        addNewTask(input.value);
        input.value = "";
    }

});