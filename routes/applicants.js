const express=require('express');
const ApplicantService=require('../services/applicants');
const verifyToken=require('../middlewares/verifyToken');
const verifyRole=require('../middlewares/verifyRole');
const { roleApplicants,roleAdminOnly } = require('../config');

function applicants(app){
    const router=express.Router()
    const applicantServ=new ApplicantService()

    app.use('/api/applicants',router)

    //GET
    router.get('/',verifyToken,verifyRole(roleAdminOnly),async (req,res)=>{
        try{
            const applicants = await applicantServ.getAll();
            return res.status(200).json(applicants)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //GET ONE
    router.get('/:id',verifyToken,verifyRole(roleApplicants),async (req,res)=>{
        try{
            const applicants = await applicantServ.getOne(req.params.id);
            return res.status(200).json(applicants)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //POST
    router.post("/",verifyToken,verifyRole(roleApplicants),async (req,res)=>{
        try{ 
            const applicant = {
                name:req.body.name,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                role:'APPLICANT',
                picture:req.body.picture,
                linkedin:req.body.linkedin,
                github:req.body.github,
                cv:req.body.cv,
                created:req.body.created
            }

            const applicants=await applicantServ.create(applicant)
            return res.status(200).json({ msg: 'Postulante creado correctamente', applicants}); 
        }
        catch(error){
            console.log('ERROR : ', error)
        }
        
    })


    //PUT
    router.put("/:id",verifyToken,verifyRole(roleApplicants),async (req,res)=>{
        try{
            const applicant = {
                name:req.body.name,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                //role:'APPLICANT',  NO SE PERMITE MODIFICAR
                picture:req.body.picture,
                linkedin:req.body.linkedin,
                github:req.body.github,
                cv:req.body.cv
                //created:req.body.created    NO SE PERMITE MODIFICAR
            }
            const applicants=await applicantServ.update(req.params.id,applicant)
            if(!applicants.error){
                return res.status(200).json({ msg: 'Postulante modificado', applicants}); 
            }
            return res.status(403).json({msg : "ERROR : Postulante inexistente o datos incompletos"}); 
        }   
        catch(error){
            console.log('ERROR : ', error)
        }
    })
    
    //DELETE
    router.delete("/:id",verifyToken,verifyRole(roleAdminOnly),async (req,res)=>{
        try{
            const applicants=await applicantServ.delete(req.params.id)
            if(!applicants.error){
                return res.status(200).json({ msg: 'Postulante eliminado', applicants}); 
            }
            return res.status(403).json({msg : "ERROR : Postulante inexistente"}); 
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    
};

module.exports=applicants;