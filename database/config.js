const mongoose = require("mongoose");
const dbConnection = async () =>{
    try {
        await mongoose.connect("mongodb+srv://mateosoto:verde23@ensayo.nv4qi.mongodb.net/graphql");
        console.log("base conectada")
        
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = {dbConnection};