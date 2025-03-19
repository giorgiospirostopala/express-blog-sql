///_____________________________


// non dimentichiamoci di importare Express nel file delle rotte
const express = require('express');

// importiamo anche il controller
const postsController = require('../controllers/postsController');

// importiamo i dati
const posts = require("../data/postsData");

// e definiamo router con l'istanza express.Router()
const router = express.Router();

// recuperiamo i post in formato json
//! QUESTO SOVRASCRIVEVA TUTTO
// router.get('/', (req, res) => {
//     res.json(posts);
// });


///_____________________________

// rotte ripulite grazie al controller

router.get('/', postsController.index);
router.get('/:id', postsController.show);
router.post('/', postsController.store);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.destroy);

///_____________________________


// esportiamo
module.exports = router;