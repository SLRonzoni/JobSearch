const mongoose=require('mongoose');
const { dbUserName,dbPassword,dbHost,dbName } = require('.');

const connection =async ()=>{
    const conn= await mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`, function (err) {
       if ((err) ? console.log('Error en conexion MongoDB: ',err) : console.log(`MongoDB conectada : ${dbHost}`));     
    });
}

module.exports={connection,mongoose};