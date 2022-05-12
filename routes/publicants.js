const express=require('express');
const PublicantService=require('../services/publicants');
const verifyToken=require('../middlewares/verifyToken');
const verifyRole=require('../middlewares/verifyRole');
const { rolePublicants, roleAdminOnly } = require('../config');

function publicants(app){
    const router=express.Router()
    const publicantServ=new PublicantService()

    app.use('/api/publicants',router)

    //GET                                    
    router.get('/',verifyToken,verifyRole(roleAdminOnly),async (req,res)=>{
        try{
            const publicants = await publicantServ.getAll();
            return res.status(200).json(publicants)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //GET ONE
    router.get('/:id',verifyToken,verifyRole(rolePublicants),async (req,res)=>{
        try{
            const publicant = await publicantServ.getOne(req.params.id);
            return res.status(200).json(publicant)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //POST
    router.post("/",verifyToken,verifyRole(rolePublicants),async (req,res)=>{
        try{ 
            const publicant = {
                name:req.body.name,
                street:req.body.street,
                number:req.body.number,
                city:req.body.city,
                state:req.body.state,
                country:req.body.country,
                phone:req.body.phone,
                email:req.body.email,
                password:req.body.password,
                role:'PUBLICANT',
                picture:req.body.picture,
                linkedin:req.body.linkedin,
                github:req.body.github,
                created:req.body.created
            }

            const publicants=await publicantServ.create(publicant)
            return res.status(200).json({ msg: 'Empresa creada correctamente', publicants}); 
        }
        catch(error){
            console.log('ERROR : ', error)
        }
        
    })


    //PUT
    router.put("/:id",verifyToken,verifyRole(rolePublicants),async (req,res)=>{
        try{
            const publicant = {
                name:req.body.name,
                street:req.body.street,
                number:req.body.number,
                city:req.body.city,
                state:req.body.state,
                country:req.body.country,
                phone:req.body.phone,
                email:req.body.email,
                password:req.body.password,
                //role:'PUBLICANT',  NO SE PERMITE MODIFICAR
                picture:req.body.picture,
                linkedin:req.body.linkedin,
                github:req.body.github               
                //created:req.body.created    NO SE PERMITE MODIFICAR
            }
            const publicants=await publicantServ.update(req.params.id,publicant)
            if(!publicants.error){
                return res.status(200).json({ msg: 'Publicante modificado', publicants}); 
            }
            return res.status(403).json({msg : "ERROR : Publicante inexistente o datos incompletos"}); 
        }   
        catch(error){
            console.log('ERROR : ', error)
        }
    })
    
    //DELETE
    router.delete("/:id",verifyToken,verifyRole(rolePublicants),async (req,res)=>{
        try{
            const publicant=await publicantServ.delete(req.params.id)
            if(!publicant.error){
                return res.status(200).json({ msg: 'Publicante aliminado', publicant}); 
            }
            return res.status(403).json({msg : "ERROR : Publicante inexistente"}); 
        }   
        catch(error){
            console.log('ERROR : ', error)
        }
    })


    //FILTROS
    //GET
    router.get("/jobsPublications",verifyToken,verifyRole(roleAdminOnly,rolePublicants),async (req,res)=>{
        try{
            const publicants = await publicantServ.getJobsByPublicant();
            return res.status(200).json(publicants)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })


    
};

module.exports=publicants;