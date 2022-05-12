const CategoryModel=require("../models/modelCategory")

class Categories{
    
    async getAll(){
        try{
            const categories=await CategoryModel.find().sort({name:1})
            return categories
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    }


    async getOne(id){
        try{
            const category=await CategoryModel.findById(id)
            return category
        }
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Categoría inexistente`
            return {
                error:true,
                message
            }
        }
    }


    async create(data){
        try{
            const category=await CategoryModel.create(data) 
            return category
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    } 


    async update(id,data){
        try{
            const category=await CategoryModel.findByIdAndUpdate(id,data,{new:true}) 
            return category
        }
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Categoría inexistente`
            return {
                error:true,
                message
            }
        }
    } 


    async delete(id){
        try{
            const category=await CategoryModel.findByIdAndDelete(id) 
            return category.name
        }
        catch(error){
            console.log('ERROR : ', error)
            const message= `ERROR : Categoría inexistente`
            return {
                error:true,
                message
            }
        }
    } 
        
}  

module.exports=Categories;