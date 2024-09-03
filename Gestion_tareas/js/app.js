document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const assignedToInput = document.getElementById('assignedToInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const statusInput = document.getElementById('statusInput');
    const taskList = document.getElementById('taskList');
    const generateReportButton = document.getElementById('generateReport');
    const reportSection = document.getElementById('report');

    let tasks = [];

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(taskInput.value, assignedToInput.value, dueDateInput.value, statusInput.value);
        taskInput.value = '';
        assignedToInput.value = '';
        dueDateInput.value = '';
        statusInput.value = 'Pendiente';
    });

    function addTask(task, assignedTo, dueDate, status) {
        const taskObject = {
            id: Date.now(),
            name: task,
            assignedTo: assignedTo,
            creationDate: new Date().toLocaleDateString(),
            dueDate: dueDate,
            status: status
        };
        tasks.push(taskObject);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${task.name}</strong> - Asignado a: ${task.assignedTo} <br>
                Creado: ${task.creationDate} - Vence: ${task.dueDate} <br>
                Estado: ${task.status}
            `;

            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Completar';
            completeBtn.className = 'complete-btn';
            completeBtn.addEventListener('click', function() {
                task.status = 'Completada';
                renderTasks();
            });

            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Actualizar';
            updateBtn.className = 'update-btn';
            updateBtn.addEventListener('click', function() {
                updateTask(task.id);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                deleteTask(task.id);
            });

            li.appendChild(completeBtn);
            li.appendChild(updateBtn);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
    }

    function updateTask(taskId) {
        const newTaskName = prompt('Actualizar nombre de la tarea:');
        const newAssignedTo = prompt('Actualizar asignación:');
        const newDueDate = prompt('Actualizar fecha de vencimiento:', tasks.find(task => task.id === taskId).dueDate);
        const newStatus = prompt('Actualizar estado:', tasks.find(task => task.id === taskId).status);
        
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.name = newTaskName || task.name;
                task.assignedTo = newAssignedTo || task.assignedTo;
                task.dueDate = newDueDate || task.dueDate;
                task.status = newStatus || task.status;
            }
            return task;
        });
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    generateReportButton.addEventListener('click', function() {
        generateReport();
    });

    function generateReport() {
        const completedTasks = tasks.filter(task => task.status === 'Completada').length;
        const totalTasks = tasks.length;
        const progress = (completedTasks / totalTasks) * 100 || 0;

        reportSection.innerHTML = `
            <p>Tareas completadas: ${completedTasks}</p>
            <p>Total de tareas: ${totalTasks}</p>
            <p>Progreso del proyecto: ${progress.toFixed(2)}%</p>
        `;
    }
});
