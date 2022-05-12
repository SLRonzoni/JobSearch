const{mongoose}=require('../config/db');
const Schema=mongoose.Schema;

const CategoriesSchema = new Schema({
    id:Number,    
    name: {
        type: String,
        uppercase:true,
        unique:[true,"ya existe una categoria registrada con este nombre"],
        required: [true,"el nombre debe ser..."]
    },

    area: {
        type: String,
        uppercase:true,
        required: [true,"el area debe ser..."]
    }
    
});

const CategoryModel=mongoose.model("Category",CategoriesSchema);
module.exports=CategoryModel;


