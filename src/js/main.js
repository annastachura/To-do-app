"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

var tasks = [];
var completedTasks = [];

function completeTask(taskId) {
    var task = tasks[taskId]
    tasks.splice(taskId, 1)
    completedTasks.push(task);
    showTasks();
}

function deleteTask(taskId) {
    tasks.splice(taskId, 1)
    showTasks();
}

function addNewTask(title) {
    tasks.push(title);
    showTasks();
}

function showTasks() {
    const answer = document.querySelector('.answer--js');
    answer.innerHTML = ("");
    tasks.forEach(function(title) {

        var taskLi = document.createElement('li');
        taskLi.innerHTML += `<button class="answer__done answer__done--js">✓</button>
        <input value="${title}"> </input>
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

const task__button = document.querySelector('.task__button--js');
task__button.addEventListener('click', function() {
    const input = document.querySelector('.task__name--js');
    if (input.value) {
        addNewTask(input.value);
    }
});