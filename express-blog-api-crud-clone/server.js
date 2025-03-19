const express = require('express');
const postsRouters = require('./routers/postsRouters');
const app = express();
const port = 3000;

// dichiarazione middlewares
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

//  per gestire gli oggetti JSON nel body
/// "Body-parser"
app.use(express.json());

// per eventuali file statici
app.use(express.static('public'));

//  colleghiamo le rotte 
/// MEGLIO "/api/posts" per convenzione!
app.use('/posts', postsRouters);

// (DOPO le rotte) 
// registrazione middlewares
app.use(notFound);
app.use(errorsHandler);

// app.listen() sempre in fondo
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost: ${port}`);
});



