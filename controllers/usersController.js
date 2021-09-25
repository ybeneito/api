const express = require('express')
const router = express.Router()
const objectId = require('mongoose').Types.ObjectId
const UserModels = require('../models/user')
const bcrypt = require("bcryptjs")

// La liste des utilisateurs
router.get('/', function (req, res) {
    try {
        UserModels.find((err, users) => {
            err ? console.error(err) : res.send(users)
        })
    } catch (error) {
        console.error(error)
    }
})


router.post('/register', async (req, res) => {

    try {
        const { first_name, last_name, email, password} = req.body
          // Vérification des infos entrées par l'utilisateur
          if(!(email && password && first_name && last_name)) {
            res.status(400).send("Tous les champs sont requis.")
        }

        // Vérification de l'existance de l'utilisateur
        const oldUser = await UserModels.findOne({ email })

        if(oldUser) {
            return res.status(409).send("L'utilisateur existe déjà")
        }

        // hashage du mot de passe à l'aide de bcrypt
        encryptedPassword = await bcrypt.hash(password, 10)

        // Creation de l'utilisateur
        const newUser = await UserModels.create({
            first_name,
            last_name,
            password: encryptedPassword,
            email: email.toLowerCase(),
        })

        
        newUser.save((err, user) => {
            err ? console.error(err) : res.send(user)
        })
    } 
    catch (err) {
        console.error(err)
    }

})

router.post('/login', async (req, res) => {
    try {
        // Récupère les valeurs entrées
        const { email, password } = req.body
        // Validation des champs requis
        if(!(email && password)) {
            res.status(400).send("Tous les champs sont requis...")
        }
        // Recherche de l'utilisateur dans la db
        const user = await UserModels.findOne({ email })
        // Vérification du mot de passe et préparation du token
        if(user && (await bcrypt.compare(password, user.password))){
            return res.status(200).send("Connecté: " + user.first_name);
        }
        // les credentials ne sont pas bons
        return res.status(400).send("Utilisateur non validé")

    } catch (err) {
        console.error(err)
    }

})

router.put('/:id', function (req, res) {
    if(!objectId.isValid(req.params.id)) return res.status(404).send("Utilisateur non trouvé")
    const updatedUser = {
        name: req.body.name,
        message: req.body.message,
        mail: req.body.mail
    }

    UserModels.findByIdAndUpdate(
        req.params.id,
        {$set: updatedUser},
        {new: true},
        (err,user) => {
            err ? console.error(err) : res.send(user)
        }
    )
})

router.delete("/:id", function (req, res) {
    if(!objectId.isValid(req.params.id)) return res.status(404).send("Utilisateur non trouvé")
    UserModel.findByIdAndDelete(req.params.id, (err,user) => {
        !err ? res.send("Supprimé" + user) : res.status(404).send("Utilisateur non trouvé")
    })
})

module.exports = router