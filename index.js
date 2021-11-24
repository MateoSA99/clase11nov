const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./graphql/schema");
const {dbConnection} = require("./database/config.js");
const app = express();

dbConnection();

app.get("/" , (req,res)=>{
    res.json({
        ok : true,
        msg : "Funcionando"

    })

})

app.use("/graphql", graphqlHTTP({
    graphiql : true,
    schema : schema

}) )

app.listen(process.env.PORT || 4000, () =>{
    console.log(`servidor arriba en puerto ${process.env.PORT || 4000}` );
})


