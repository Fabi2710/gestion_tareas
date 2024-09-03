document.addEventListener('DOMContentLoaded', function() {
    const reportContent = document.getElementById('reportContent');

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedTasks = savedTasks.filter(task => task.status === 'Completada').length;
    const totalTasks = savedTasks.length;
    const progressPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    reportContent.innerHTML = `
        <p>Tareas completadas: ${completedTasks}</p>
        <p>Total de tareas: ${totalTasks}</p>
        <p>Progreso del proyecto: ${progressPercentage.toFixed(2)}%</p>
    `;
});
