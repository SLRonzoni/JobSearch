const express=require('express');
const JobService=require('../services/jobs');
const verifyToken=require('../middlewares/verifyToken');
const verifyRole=require('../middlewares/verifyRole');
const { rolePublicants, roleApplicants } = require('../config');


function jobs(app){
    const router=express.Router()
    const jobServ=new JobService()

    app.use('/api/jobs',router)

    //GET
    router.get('/',verifyToken,verifyRole(rolePublicants,roleApplicants),async (req,res)=>{
        try{   
            //get todos los empleos x ubicacion
            if(req.query.jobLocation){
                let jobLocationRequired = req.query.jobLocation;//capturar valor enviado en ruta (localhost:4000/api/jobs?jobLocation=jobLocation) 
                const jobs = await jobServ.getAllByLocation(jobLocationRequired);
                return res.status(200).json(jobs)
            }

            //get todos los empleos x nombre del puesto 
            if(req.query.jobOfferedName){
                let jobOfferedNameRequired = req.query.jobOfferedName;//capturar valor enviado en ruta (localhost:4000/api/jobs?jobOfferedName=jobOfferedName) 
                const jobs = await jobServ.getAllByOfferedName(jobOfferedNameRequired);
                return res.status(200).json(jobs)
            }

            //get todos los empleos
            const jobs = await jobServ.getAll();
            return res.status(200).json(jobs)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //GET ONE
    router.get('/:id',verifyToken,verifyRole(rolePublicants,roleApplicants),async (req,res)=>{
        try{
            const job = await jobServ.getOne(req.params.id);
            if(!job.error){
                return res.status(200).json(job); 
            }
            return res.status(403).json({msg : "ERROR : Aviso inexistente"}); 
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //POST
    router.post("/",verifyToken,verifyRole(rolePublicants),async (req,res)=>{
        try{ 
            const job = {
                publicantId:req.body.publicantId,
                jobOfferedName:req.body.jobOfferedName,
                jobLocation:req.body.jobLocation,
                jobDescription:req.body.jobDescription,
                JobSalary:req.body.jobSalary,
                categoryId:req.body.categoryId,
                created:req.body.created
            }

            const jobs=await jobServ.create(job)
            return res.status(200).json({ msg: 'Aviso creado ', jobs}); 
        }
        catch(error){
            console.log('ERROR : ', error)
        }
        
    })


    //PUT PUBLICANTS
    router.put("/:id",verifyToken,verifyRole(rolePublicants),async (req,res)=>{
        try{
            const job = {
                publicantId:req.body.publicantId,
                jobOfferedName:req.body.jobOfferedName,
                jobLocation:req.body.jobLocation,
                jobDescription:req.body.jobDescription,
                JobSalary:req.body.jobSalary,
                categoryId:req.body.categoryId                       
                //created:req.body.created    NO SE PERMITE MODIFICAR
            }
            const jobs=await jobServ.update(req.params.id,job)
            if(!jobs.error){
                return res.status(200).json({ msg: 'Aviso modificado', jobs}); 
            }
            return res.status(403).json({msg : "ERROR : Aviso inexistente"});
        }   
        catch(error){
            console.log('ERROR : ', error)
        }
    })


    //PUT APPLICANTS ( los postulantes se postulan para el aviso seleccionado )
    router.put("/application/:id",verifyToken,verifyRole(roleApplicants),async (req,res)=>{
        try{
            const job = {
                applicantId:req.body.applicantId
            }
            const jobs=await jobServ.updateApplicant(req.params.id,job)
            if(!jobs.error){
                return res.status(200).json({ msg: 'Postulacion efectuada ! ', jobs}); 
            }
            return res.status(403).json({msg : "ERROR : Aviso  inexistente"});
        }   
        catch(error){
            console.log('ERROR : ', error)
        }
    })
    
    //DELETE
    router.delete("/:id",verifyToken,verifyRole(rolePublicants),async (req,res)=>{
        try{
            const job=await jobServ.delete(req.params.id)
            if(!job.error){
                return res.status(200).json({ msg: 'Aviso eliminado', job}); 
            }
            return res.status(403).json({msg : "ERROR : Aviso inexistente"});
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //FILTROS                                                                                             
    //GET JOBS BY PUBLICANT ( pueden acceder los postulantes , los publicantes y el administrador)
    router.get('/jobsByPublicant/:id',verifyToken,verifyRole(rolePublicants,roleApplicants),async (req,res)=>{
        try{
            const job = await jobServ.getJobsByPublicant(req.params.id);
            return res.status(200).json(job)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //GET JOBS BY APPLICANT ( solo pueden acceder los postulantes y el administrador)
    router.get('/jobsByApplicant/:id',verifyToken,verifyRole(roleApplicants),async (req,res)=>{
        try{
            const job = await jobServ.getJobsByApplicant(req.params.id);
            return res.status(200).json(job)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

    //GET JOBS BY CATEGORY ( pueden acceder los postulantes, los publicantes y el administrador)
    router.get('/jobsByCategory/:id',verifyToken,verifyRole(rolePublicants,roleApplicants),async (req,res)=>{
        try{
            const job = await jobServ.getJobsByCategory(req.params.id);
            return res.status(200).json(job)
        }
        catch(error){
            console.log('ERROR : ', error)
        }
    })

        
};

module.exports=jobs;