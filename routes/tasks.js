var express = require('express');
var router = express.Router();
const tasksData = require('../data/task'); 


router.get('/', async function(req, res) {
  const tasks = await tasksData.getTasks();
  res.json(tasks);
});


router.get('/:id', async (req, res) => {
  const task = await tasksData.getTask(req.params.id);
  
  if(task != null){
    res.json(task);
  } else {
    res.send('Tarea no existente!');
  }

  res.json(task);
});


router.get('/prioridad/:priority', async(req,res) =>{
  const tasks = await tasksData.getTaskByPriority(req.params.priority);

  if(tasks != null){
    res.json(tasks);
  } else {
    res.send('No se encontraron tareas!');
  }
})

//Agregar Task
router.post('/', async (req, res) => {
  let task = req.body;

  task = await tasksData.addTask(task);
  res.json(task);
});

//Update a 1 task pasando su ID
router.put('/:id', async (req, res) => {

  let id = req.params.id;
  let task = req.body;
  task.id = id;


  task = await tasksData.updateTask(task);

  if(task != null){
    res.json(task);
  } else {
    res.send('Tarea no existente!');
  }

});


router.delete('/:id', async(req, res) => {
  let id = req.params.id;
  await tasksData.deleteTask(id);
  res.send('Tarea eliminada!');
});


module.exports = router;
