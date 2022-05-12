const express=require('express');
const CategoryService=require('../services/categories');
const verifyToken=require('../middlewares/verifyToken');
const verifyRole=require('../middlewares/verifyRole');
const {roleAdminOnly } = require('../config');

function categories(app){
    const router=express.Router()
    const categoryServ=new CategoryService()

    app.use('/api/categories',router)

    //GET
    router.get('/',verifyToken,async (req,res)=>{
        try{
            const categories = await categoryServ.getAll();
            return res.status(200).json(categories)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //GET ONE
    router.get('/:id',verifyToken,async (req,res)=>{
        try{
            const categories = await categoryServ.getOne(req.params.id);
            return res.status(200).json(categories)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //POST
    router.post("/",verifyToken,verifyRole(roleAdminOnly),async (req,res)=>{
        try{ 
            const category = {
                name:req.body.name,
                area:req.body.area
            }

            const categories=await categoryServ.create(category)
            return res.status(200).json({ msg: 'Categoria creada correctamente', categories}); 
        }
        catch(error){
            console.log('ERROR : ', error)
        }
        
    })


    //PUT
    router.put("/:id",verifyToken,verifyRole(roleAdminOnly),async (req,res)=>{
        try{
            const category = {
                name:req.body.name,
                area:req.body.area
            }
            const categories=await categoryServ.update(req.params.id,category)
            return res.status(200).json({ msg: 'Categoria modificada', categories}); 
        }   
        catch(error){
            console.log('ERROR : ', error)
        }
    })
    
    //DELETE
    router.delete("/:id",verifyToken,verifyRole(roleAdminOnly),async (req,res)=>{
        try{
            const categories=await categoryServ.delete(req.params.id)
            return res.status(200).json({ msg: 'Categoria eliminada', categories}); 
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    
};

module.exports=categories;