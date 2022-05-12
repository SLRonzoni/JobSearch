const jwt = require("jsonwebtoken")
const { tokenSecret } = require("../config")

function tokenValidation(req,res,next){
    
    //verificacion de existencia y validez del token
    if(!req.headers.authorization){
        return res.status(403).json({msg:`Token Inexistente`});
    } else{        
        let Btoken=req.headers.authorization.split(' ')[1];
        jwt.verify(Btoken,tokenSecret,(error,authData)=>{
            if(error){
                return res.status(403).json({msg:`${error.message} : Permisos insuficientes, verifique token`});
            } else{
                req.user=authData;
                console.log(`Token correcto para el usuario : ${authData.email}`);
                next(); 
            };
        });  
    }   
}

module.exports = tokenValidation