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

var tasks = [
    "zadzwoń do mamy",
    "kup pomidory",
    "wynieś śmieci",
    "Pobiegaj"
];

function addNewTask(title) {

    var taskLi = ` <li class="answer__element">
    <button class="answer__done answer__done--js">✓</button>
    <input value="${title}"> </input>
    <button class="answer__wrong">X</button>
</li>`

    const answer = document.querySelector('.answer--js');
    answer.innerHTML += taskLi;

}

function showTasks() {
    tasks.forEach(function(task) {
        addNewTask(task);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    showTasks();
});


const task__button = document.querySelector('.task__button--js');
task__button.addEventListener('click', function() {
    const input = document.querySelector('.task__name--js');
    addNewTask(input.value);
});


// const done = document.querySelector('.done--js');
// const answer__done = document.querySelector('.answer__done--js');
// answer__done.addEventListener('click', function() {


// });

var completedTasks = [];

function completeTask(taskId) {
    var task = tasks[taskId]
    tasks.splice(taskId, 1)
    completedTasks.push(task);
    showTasks();
    //     var deleteTaskLI = `<ul class="done done--js">
    //   <li class="done__task"></li>
    // </ul>`
}