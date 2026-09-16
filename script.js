document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const todoForm = document.getElementById('todo-form')
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-img');
    const todosContainer = document.querySelector('.todos-container');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');

    const triggerConfetti = () => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
            })
        }
    }

    const toggleEmptyState = () => {
        const hasTasks = taskList.children.length > 0;
        emptyImage.style.display = hasTasks ? 'none' : 'block';

        // emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        // todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('input.checkbox:checked').length;
        const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        progressBar.style.width = `${percentage}%`;
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;
        // progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        // progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;
        if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
            triggerConfetti();
        }
    };

    const saveTaskToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('input.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = (text = '', completed = false, checkCompletion = true) => {
        const taskText = text || taskInput.value.trim();
        if (!taskText) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class ="checkbox" ${completed ? 'checked' : ''}>
        <span></span>
        <div class='task-buttons'>
            <button type="button" class="edit-btn" aria-label="Edit Task"><i class="fa-solid fa-pen"></i></button>
            <button type="button" class="delete-btn" aria-label="Delete Task"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        li.querySelector('span').textContent = taskText;

        const checkbox = li.querySelector('input.checkbox');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn')

        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress(true);
            saveTaskToLocalStorage();
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                taskInput.focus();
                li.remove();
                toggleEmptyState();
                updateProgress(false);
                saveTaskToLocalStorage();
            }
        });

        deleteBtn.addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
            updateProgress(false);
            saveTaskToLocalStorage();
        })

        taskList.appendChild(li);
        if (!text) taskInput.value = '';
        // taskInput.value = '';
        toggleEmptyState();
        updateProgress(checkCompletion);
        saveTaskToLocalStorage();
    };
    
    const loadTasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
        toggleEmptyState();
        updateProgress(false);
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });

    loadTasksFromLocalStorage();
});