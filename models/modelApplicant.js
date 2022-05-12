const{mongoose}=require('../config/db');
const Schema=mongoose.Schema;

const ApplicantsSchema = new Schema({
    id:Number,
    name: {
        type: String,
        uppercase:true,
        required: [true,"el nombre es obligatorio"]
    },

    lastName: {
        type: String,
        uppercase:true,
        required: [true,"el apellido es obligatorio"]
    },
    
    email:{
        type: String,
        uppercase:true,
        unique:[true,"ya existe un postulante registrado con este email"],
        required:[true,"el email es obligatorio"]
    },
    
    password:{
        type: String,
        required: [true,"la password es obligatoria"]
    },
    
    picture:Buffer,
    
    linkedin:{
        type: String,
        uppercase:true,
        // validate: {
        //     validator: function(text) {
        //         return text.indexOf('HTTPS://WWW.LINKEDIN.COM/') === 0;
        //     },
        //     message: 'LinkedIn debe comenzar con https://www.linkedin.com/'
        // }
    },
    
    github:{
        type: String,
        uppercase:true,
        // validate: {
        //     validator: function(text) {
        //         return text.indexOf('HTTPS://WWW.GITHUB.COM/') === 0;
        //     },
        //     message: 'Github debe comenzar con https://www.github.com/'
        // }
    },
    
    cv:String,
    
    role:{ 
        type: String,
        uppercase:true,
        required:true,
        enum:['APPLICANT','ADMIN'],
        default: 'APPLICANT'
    },
    
    created:{ 
        type: Date,
        default: Date.now
    }
});

const ApplicantModel=mongoose.model("Applicant",ApplicantsSchema);
module.exports=ApplicantModel;

