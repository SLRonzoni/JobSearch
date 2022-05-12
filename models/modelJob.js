const{mongoose}=require('../config/db');
const Schema=mongoose.Schema;

const JobsSchema = new Schema({
    id:Number,

    //RELACION CON LA COLECCION PUBLICANTS
    publicantId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    
    jobOfferedName:{
        type: String,
        uppercase:true,
        required: [true,"el nombre del empleao ofrecido debe ser..."] 
    },

    jobLocation:{
        type: String,
        uppercase:true,
        required: [true,"la ubicacion del empleo ofrecido debe ser : localidad, provincia y/o pais"] 
    },

    jobDescription:{
        type: String,
        uppercase:true,
        required: [true,"la descripcion del empleo ofrecido debe ser..."] 
    },

    jobSalary:Number,
      
    // RELACION CON LA COLECCION CATEGORIES
    categoryId:{
        type: mongoose.Types.ObjectId,
        required: true
    },

    //RELACION CON LA COLECCION APPLICANTS
    applicantId:{
        type: Array,
    },

    created:{ 
        type: Date,
        default: Date.now
}

    
});

const JobModel=mongoose.model("Job",JobsSchema);
module.exports=JobModel;