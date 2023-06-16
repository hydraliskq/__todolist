'use strict';

const form = document.querySelector('#form'),
	  taskInput = document.querySelector('#taskInput'),
	  tasksList = document.querySelector('#tasksList'),
	  emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);


if(localStorage.getItem('tasksHTML')) {
	tasksList.innerHTML = localStorage.getItem('tasksHTML');
}

function addTask(e) {
	e.preventDefault();

	const taskText = taskInput.value;

	const taskElement = `
		<li class="list-group-item task-item d-flex justify-content-between">
			<span class="task-item__title">${taskText}</span>
			<div class="task-item__buttons">
				<button type="button" data-action="done" class="task-item__button border-0">
					<img src="img/tick.svg" width="18" height="18" alt="">
				</button>
				<button type="button" data-action="delete" class="task-item__button border-0">
					<img src="img/cross.svg" width="18" height="18" alt="">
				</button>
			</div>
		</li>
	`;

	tasksList.insertAdjacentHTML('beforeend', taskElement);

	taskInput.value = '';
	taskInput.focus();

	if(tasksList.children.length > 1) {
		emptyList.style.display = 'none';
	}

	saveHTMLtoLS();
}

function deleteTask(e) {
	if(e.target.dataset.action !== 'delete') {
		return;
	}

	const taskParent = e.target.closest('li');
	taskParent.remove();

	if(tasksList.children.length == 1) {
		emptyList.style.display = '';
	}

	saveHTMLtoLS();
}

function doneTask(e) {

	if(e.target.dataset.action !== 'done') {
		return;
	}

	const taskParent = e.target.closest('li');
	const taskTitle = taskParent.querySelector('span');

	taskTitle.classList.toggle('task-title--done');

	saveHTMLtoLS();
}

function saveHTMLtoLS() {
	localStorage.setItem('tasksHTML', tasksList.innerHTML);
}