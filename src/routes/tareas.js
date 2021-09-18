const { Router } = require('express');
const router = Router();
const _ = require('underscore');


const tareas = require('./sample.json');

//obtener todos las tareas
router.get('/', (req, res) => {
    res.json(tareas);
})

//obtener tarea por id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    _.each(tareas, (tarea, i) => {
        if(tarea.id == id){
            res.json(tarea);
        };
    });
})

//agregar nueva tarea
router.post('/', (req, res) => {
    const { title, description, completed} = req.body;
    if (title && description && completed){
        const id = tareas.length + 1;
        const newNote = {id , ...req.body};
        tareas.push(newNote);
        res.json(tareas);
    } else {
        res.status(500).json({error: 'No se guardó, F'})
    }
})

//actualizar titulo y descripción por id
router.put('/:id', (req,res) => {
    const {id} = req.params;
    const { title, description} = req.body;
    if(title && description){
        _.each(tareas, (tarea, i) => {
            if(tarea.id == id){
                tarea.title = title;
                tarea.description = description;
            };
        });
        res.json(tareas);
    }else {
        res.status(500).json({error: "No se cambio nada, F"});
    }

})

//Eliminar titulo y descripción por id
router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    _.each(tareas, (tarea, i)=>{
        if(tarea.id == id){
            tareas.splice(i, 1);
        }
    })
    res.send(tareas);   
})
module.exports = router;