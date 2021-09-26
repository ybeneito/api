const express = require('express')
const router = express.Router()
const db= require('../config/sqlite')
const bcrypt = require("bcryptjs")

// La liste des utilisateurs
router.get('/', function (req, res) {
    try {
        db.all("SELECT * FROM Users", [], (err, users) => {
            err ? res.send(err) : res.send(users)
        })
    } catch (error) {
        console.error(error)
    }
})

// Un utilisateur par son id
router.get("/:id", function(req, res) {
    try {
        const id = req.params.id
        db.each("SELECT * FROM Users WHERE UserId = ?", id, (err, user) => {
            err ? res.status(404).send(err) : res.status(200).send(user)
        })
    } catch (error) {
        console.error(error)
    }
})

// Ajout d'un utilisateur
router.post('/register', async (req, res) => {
    try {
        var {name,mail,password} = req.body 
          // Vérification des infos entrées par l'utilisateur
          if(!(name && password && mail)) {
            res.status(400).send("Tous les champs sont requis.")
        }

        mail = '"' + mail + '"'

        // Vérification de l'existance de l'utilisateur
        const oldUser = await db.run("SELECT mail FROM Users WHERE mail = ? ", mail)
        
        if(oldUser) {
            return res.status(409).send("L'utilisateur existe déjà")
        }

        // hashage du mot de passe à l'aide de bcrypt
        var encryptedPassword = await bcrypt.hash(password, 10)

        // Preparaion des datas
        name = '"' + name + '"'
        encryptedPassword = '"' + encryptedPassword + '"'

        // creation de la requete 
        const query = `INSERT INTO Users (name, mail, password) VALUES(${name},${mail}, ${encryptedPassword})`
    
        // Creation de l'utilisateur
        await db.run(query, (err) => {
            err ? console.error(err) : res.send("utilisateur: " + name)
        })
    } 
    catch (err) {
        console.error(err)
    }
})

// Modification d'un utilisateur
router.put('/:id', async (req, res) => {
    try {
        var id = req.params.id 
        var {name, mail, password} = req.body
        var encryptedPassword = await bcrypt.hash(password, 10)
        name = '"' + name + '"'
        mail = '"' + mail + '"'
        password = '"' + encryptedPassword + '"'
        const query = `UPDATE Users SET name = ${name}, mail = ${mail}, password = ${password} WHERE UserId = ${id}`;
        
        await db.run(query, (err) => {
            err ? console.error(err) : res.send("utilisateur: " + name)
        })
    } catch (error) {
        console.error(error)
    }
})

// Suppression d'un utilisateur 
router.delete("/:id", async (req, res) => {
    try {
        var id = req.params.id;
        await db.run(`DELETE FROM Users WHERE UserId = ${id}`, (err) => {
            err ? console.error(err) : res.send(`Utilisateur ${id} supprimé`)
        })
    } catch (err) {
        console.log(err)
    }
})


module.exports = router