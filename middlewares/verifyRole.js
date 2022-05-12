const jwt=require('jsonwebtoken');
const {tokenSecret}= require('../config');

const ApplicantService=require('../services/applicants');
const PublicantService=require('../services/publicants');

let tokenData="";
let bdRole="";

//Control de roles para el acceso a las rutas
const roleValidation = (...roleEnRuta )=> async (req,res,next) =>{
    
   try{
        const token=req.headers.authorization.split(' ').pop()
        const decodedToken = async (token)=>{   
            try{ 
                return( jwt.verify(token,tokenSecret))
            }
            catch(error){
                return null
            }
        };
        
        tokenData= await decodedToken(token) 
     
        // IDENTIFICAR QUIEN ES EL USUARIO
        if( (roleEnRuta[0].includes('APPLICANT'))  ) {
            const applicantServ=new ApplicantService()
            bdRole=await applicantServ.getByEmail(tokenData.email)   
        };

        if( (roleEnRuta[0].includes('PUBLICANT'))  ) {
            const publicantServ=new PublicantService()
            bdRole=await publicantServ.getByEmail(tokenData.email)
        };

    
        if( (roleEnRuta==='ADMIN')  ) {
            bdRole={role:'ADMIN'}
        };


        // VERIFICAR SI ESTA AUTORIZADO PARA ESA RUTA
        if( ((roleEnRuta[0].includes(bdRole.role)) === false)  ){
            return res.status(403).json({msg:"Operación no autorizada, permisos insuficientes"});
        } else { 
            next()
        }
    }
    catch(error){
        console.log(error);
        return res.status(403).json({msg:"Operación no autorizada, permisos insuficientes"});
    }
}


module.exports=roleValidation;
