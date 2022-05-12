const{mongoose}=require('../config/db');
const Schema=mongoose.Schema;

const PublicantsSchema = new Schema({
    id:Number,
    name: {
        type: String,
        uppercase:true,
        required: [true,"el nombre es obligatorio"]
    },

    street: {
        type: String,
        uppercase:true,
        required: [true,"la calle es obligatoria"]
    },

    number: {
        type: Number,
        uppercase:true,
        required: [true,"el numero es obligatorio"]
    },

    city: {
        type: String,
        uppercase:true,
        required: [true,"la ciudad ó localidad es obligatoria"]
    },

    state: {
        type: String,
        uppercase:true,
        required: [true,"la provincia es obligatoria"]
    },

    country: {
        type: String,
        uppercase:true,
        required: [true,"el pais es obigatorio"]
    },

    phone: {
        type: String,
        required: [true,"el telefono es obligatorio"]
    },
 
    email:{
        type: String,
        uppercase:true,
        unique:[true,"ya existe una empresa registrada con este email"],
        required:[true,"el email es obligatorio"]
    },
    
    password:{
        type: String,
        required: [true,"la password es obligatoria"]
    },
    
    picture:Buffer,

    web:{ 
        type: String,
        uppercase:true
    },
    
    role:{ 
        type: String,
        required:true,
        uppercase:true,
        enum:['PUBLICANT','ADMIN'],
        default: 'PUBLICANT'
    },
    
    created:{ 
        type: Date,
        default: Date.now
    },


});

const PublicantModel=mongoose.model("Publicant",PublicantsSchema);
module.exports=PublicantModel;

