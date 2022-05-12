const ApplicantModel=require("../models/modelApplicant")

class Applicants{
    
    async getAll(){
        try{
            const applicants=await ApplicantModel.find().sort({lastName:1}).sort({name:1})
            return applicants
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    }

    async getByEmail(email){
        try{
            const applicant=await ApplicantModel.findOne({email})
            return applicant
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    }



    async getOne(id){
        try{
            const applicant=await ApplicantModel.findById(id)
            return applicant
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


    async create(data){
        try{
            const applicant=await ApplicantModel.create(data) 
            return applicant
        }
        catch(error){
            if(error.code===11000){
                const message= `ERROR : El email "${error.keyValue.email}" ya se encuentra registrado`
                return {
                    error:true,
                    message
                }
            }
        }
    } 


    async update(id,data){
        try{
            if(id,data){
                const applicant=await ApplicantModel.findByIdAndUpdate(id,data,{new:true}) 
                return applicant
            }
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


    async delete(id){
        try{
            const applicant=await ApplicantModel.findByIdAndDelete(id) 
            return `${applicant.name} ${applicant.lastName}`
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
        
}  

module.exports=Applicants;