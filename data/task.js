const fs = require('fs').promises;
require('dotenv').config();
const path = './data/tasks.json';


async function getTasks(){
    const tasks = await fs.readFile(path, 'utf-8');
    return JSON.parse(tasks);
}

async function getTask(id){
    const tasks = await getTasks();
    return tasks.find(task => task.id == id);
}

async function getTaskByPriority(priority){
    const tasks = await getTasks();
    return tasks.filter(task => task.prioridad == priority);
}

async function addTask(task){
    const tasks = await getTasks();
    tasks.sort((a, b) => a.id - b.id);
    const lastId = tasks[tasks.length-1].id;
    task.id = lastId + 1;
    tasks.push(task);
    await fs.writeFile(path, JSON.stringify(tasks, null, ''));

    return task;
}

async function updateTask(task){
    const tasks = await getTasks();
    //console.log(tasks);
    const i = tasks.findIndex(t => t.id == task.id); //returns -1 if not found

    if(i != -1){

        if(task.nombre){
            tasks[i].nombre = task.nombre;
        }
        if(task.descripcion){
            tasks[i].descripcion = task.descripcion;
        }
        if(task.prioridad){
            tasks[i].prioridad = task.prioridad;
        }
    
        await fs.writeFile(path, JSON.stringify(tasks,null,''));
    }

    return tasks[i];

}


async function deleteTask(id){
    
    const tasks = await getTasks();
    const i = tasks.findIndex(t => t.id == id);

    if(i != -1){
        tasks.splice(i,1);
    }

    await fs.writeFile(path,JSON.stringify(tasks,null,''));
    
}


module.exports = {getTasks, getTask, addTask, updateTask, deleteTask, getTaskByPriority};