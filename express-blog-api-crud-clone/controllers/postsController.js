/// MEGLIO "nome-al-singolareController.js" per convenzione!

// per prima cosa importiamo i dati, quindi posts[]
const posts = require("../data/postsData");

function index(req, res) {

    let filteredPosts = posts;

    if (req.query.tag) {
        filteredPosts = posts.filter(post => post.tags.includes(req.query.tag));
    }

    res.json(filteredPosts);

    // res.send(`Lista dei post`);

}


function show(req, res) {

    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    // contratto ( MEGLIO USARE VERSIONE ESTESA ):
    // const post = posts.find(post => post.id === parseInt(req.params.id));

    // in teoria questo fa già quanto richiesto dal bonus (?)
    if (!post) {
        res.status(404);
        return res.json({ status: 404, error: "Not Found", message: "Id non associato a nessun post" });
    }

    res.json(post);

    // res.send(`Dettaglio del post: ${req.params.id}`);

}


function store(req, res) {

    // id incrementale automatico da database
    const newId = posts[posts.length - 1].id + 1;

    // nuovo post specifico [ avevo maleinterpretato la milestone ]
    // const newPost = {
    //     "id": newId,
    //     "title": "Pippo",
    //     "content": "Pippo che pippa.",
    //     "image": "/imgs/posts/pippopippa.jpg",
    //     "tags": ["Pippo", "Droga", "Sniffare", "Dipendenza"]
    // };

    // nuovo post customizzabile [ corretto ]
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };

    // push del post
    posts.push(newPost);

    // check
    console.log(posts);

    // restituzioni
    res.status(201);
    res.json(newPost);

}


function update(req, res) { // "modify" invece la fa parziale

    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    // Not found (bonus)
    if (!post) {
        res.status(404);
        return res.json({ status: 404, error: "Not Found", message: "Id non associato a nessun post" });
    }

    // updating post
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    // updated data check
    console.log(posts);

    // updated post
    res.json(post);

}


function destroy(req, res) {

    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    // in teoria questo fa già quanto richiesto dal bonus (?)
    if (!post) {
        res.status(404);
        return res.json({ status: 404, error: "Not Found", message: "Id non associato a nessun post" });
    }

    posts.splice(posts.indexOf(post), 1);

    console.log(posts); // per vedere il nuovo array

    res.sendStatus(204);

    // res.send(`Eliminazione del post: ${req.params.id}`);

}


// esportiamo tutto
module.exports = { index, show, store, update, destroy }

