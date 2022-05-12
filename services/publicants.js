const PublicantModel=require("../models/modelPublicant")

class Publicants{
    
    async getAll(){
        try{
            const publicants=await PublicantModel.find().sort({lastName:1}).sort({name:1})
            return publicants
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    }

    async getByEmail(email){
        try{
            const publicant=await PublicantModel.findOne({email})
            return publicant
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    }


    async getOne(id){
        try{
            const publicant=await PublicantModel.findById(id)
            return publicant
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


    async create(data){
        try{
            
            const publicant=await PublicantModel.create(data)        
            return publicant
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
                const publicant=await PublicantModel.findByIdAndUpdate(id,data,{new:true}) 
                return publicant
            }    
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


    async delete(id){
        try{
            const publicant=await PublicantModel.findByIdAndDelete(id) 
            return `${publicant.name} , ${publicant.email}`
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

        
}  

module.exports=Publicants;