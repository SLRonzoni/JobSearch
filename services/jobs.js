const{mongoose}=require('../config/db');
const JobModel=require("../models/modelJob")


class Jobs{
    
    async getAll(){
        try{
            const jobs=await JobModel.find().sort({jobOfferedName:1})
            return jobs
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    }

    async getOne(id){
        try{
            const job=await JobModel.findById(id)
            return job
        }
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Aviso inexistente`
            return {
                error:true,
                message
            }
        }
    }

    async getAllByLocation(jobLocationRequired){              
        try{
            const jobs=await JobModel.find({jobLocation:jobLocationRequired})
            return jobs
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    }


    async getAllByOfferedName(jobOfferedNameRequired){              
        try{
            const jobs=await JobModel.find({jobOfferedName:jobOfferedNameRequired})
            return jobs
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    }


    async create(data){
        try{
            const job=await JobModel.create(data)        
            return job
        }
        catch(error){                                                      
            console.log(error)
        }
    } 
    

    async updateApplicant(id,data){
        try{
            const job=await JobModel.findById(id) 
            job.applicantId.push(data)
            await job.save()
            return job
        }
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Aviso inexistente`
            return {
                error:true,
                message
            }
        }
    } 

    async update(id,data){
        try{
            const job=await JobModel.findByIdAndUpdate(id,data,{new:true}) 
            return job
        }
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Aviso inexistente`
            return {
                error:true,
                message
            }
        }
    }

    async delete(id){                            
        try{
            const job=await JobModel.findByIdAndDelete(id) 
            return `${job.jobOfferedName} `                      
        }
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Aviso inexistente`
            return {
                error:true,
                message
            }
        }
    } 

    //FILTROS CON RELACIONES
    //todos los avisos del mismo publicante
    async getJobsByPublicant(id){   
        try{
            const idObject=mongoose.Types.ObjectId(id) 
            const jobsByPublicant=await JobModel.aggregate(               
                [  { $lookup: {
                        from: "publicants",                     
                        localField:"publicantId",                       
                        foreignField:"_id",                    
                        as:"jobPublicant"
                             }
                   },
                   {$match:{publicantId:idObject}},
                   {$project:
                        { id:1,
                        jobOfferedName:1,
                        created:1,
                        jobLocation:1,
                        jobDescription:1,
                        categoryId:1,
                        'jobPublicant._id':1,
                        'jobPublicant.name':1,             
                        'jobPublicant.phone':1,
                        'jobPublicant.email':1,
                        }
                    } ]
            )
            return(jobsByPublicant)
        }       
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Publicante inexistente`
            return {
                error:true,
                message
            }
        }
    }


    //todos los postulados para el mismo aviso         
    async getApplicantsByJob(id){
        try{
            const applicantsByJob=await JobModel.aggregate(               
                [ { $lookup: {
                        from: "applicants",                     
                        localField:"applicantId",                       
                        foreignField:"_id",                    
                        as:"jobApplicant"
                             }
                },
                {$unwind:"$applicantId"},
                {$project:
                    { id:1,
                    publicantId:1,
                    created:1,
                    jobOffered:1,
                    categoryId:1,
                    'applicantId':1             
                    }
                }
                ]  
             )           
            
            return(applicantsByJob)
        }       
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Postulante inexistente`
            return {
                error:true,
                message
            }
        }
    }

    //todos los avisos de la misma categoria
    async getJobsByCategory(id){
        try{
            const idObject=mongoose.Types.ObjectId(id)       
            
            const jobsByCategory=await JobModel.aggregate(               
                [{ $lookup: {
                        from: "categories",                     
                        localField:"categoryId",                       
                        foreignField:"_id",                    
                        as:"jobCategory"
                            }
                   },
                   {$match:{categoryId:idObject}},
                   {$project:
                             { id:1,
                               jobOfferedName:1,
                               created:1,
                               jobLocation:1,
                               jobDescription:1,
                               'jobCategory._id':1,
                               'jobCategory.name':1,              
                               'jobCategory.area':1
                              }
                    } ],
            )
            return(jobsByCategory)
        }       
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Categoria inexistente`
            return {
                error:true,
                message
            }
        }
    }
        
}  

module.exports=Jobs;