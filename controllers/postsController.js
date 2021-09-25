const express = require('express');
const router = express.Router()
const objectId = require('mongoose').Types.ObjectId;
const PostModels = require('../models/post')

router.get('/', function (req, res) {
    PostModels.find((err, posts) => {
        err ? console.error(err) : res.send(posts)
    })
})

router.post('/', function (req, res) {
    const newPost = new PostModels({
        author: req.body.author,
        message: req.body.message,
    })

    newPost.save((err, post) => {
        err ? console.error(err) : res.send(post)
    })
})

router.put('/:id', function (req, res) {
   if(!objectId.isValid(req.params.id)) return res.status(404).send("Post non trouvé")
   const updatedPost = {
       author: req.body.author,
       message: req.body.message,
   }
   
   PostModels.findByIdAndUpdate(
       req.params.id,
       { $set: updatedPost },
       {new: true},
       (err, post) => {
           err ? console.error(err) : res.send(post)
       }
   )

})

router.delete('/:id', function (req, res){
    if(!objectId.isValid(req.params.id)) return res.status(404).send('Post non trouvé')

    PostModels.findByIdAndRemove(req.params.id, (err,post) => {
        !err ? res.send("Supprimé: " + post) : console.err(err)
    })

    res
})

module.exports = router