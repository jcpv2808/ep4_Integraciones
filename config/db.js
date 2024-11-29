const mongoose = require("mongoose")

const conectarBD = async ()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/ep4', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }catch(error){
        console.log(error)
        process.exit()
    }
}

module.exports = conectarBD