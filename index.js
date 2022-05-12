const express = require('express');
const {port}=require("./config");

//DB
const {connection}=require('./config/db');

//IMPORTAR ROUTES
const authApplicant = require("./routes/authApplicant");
const authPublicant = require("./routes/authPublicant");
const applicants = require("./routes/applicants");
const publicants = require("./routes/publicants");
const categories = require("./routes/categories");
const jobs = require("./routes/jobs");

connection()

const app = express();

const morgan=require('morgan');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//USAR ROUTES
authApplicant(app);
authPublicant(app);

applicants(app);
publicants(app);
categories(app);
jobs(app);

app.get('/*',async(req,res)=>{
    console.log("Ruta no encontrada");
    await res.status(404).json('ERROR: Ruta no encontrada');
})

app.listen(port,()=>{
    console.log("Servidor escuchando en http://localhost: "+port);
});


