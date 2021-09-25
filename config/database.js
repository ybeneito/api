const mongoose = require('mongoose');
const mongo = process.env.MONGO_URI
mongoose.connect(
        mongo,
         { 
        useNewUrlParser: true,
      useUnifiedTopology: true,
        })
    .then(() => {
        console.log("Connected to db")
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
