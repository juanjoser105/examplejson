const express = require('express');
const app = express();
const morgan = require('morgan');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/index'))
app.use('/api/tareas', require('./routes/tareas'))

//empeando el servidor
app.listen(app.get('port'), ()=>{
    console.log(`server on por ${3000}`);
})