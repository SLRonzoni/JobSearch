const jwt=require('jsonwebtoken');
const {tokenSecret, tokenExpires, rolePublicants}= require('../config')

const bcrypt=require('bcrypt')
const Publicant=require("./publicants")

class AuthPublicant{
    
    //LOGUEO
    async login(data){
        const {email,password}=data
        const publicantServ=new Publicant()
        const publicant=await  publicantServ.getByEmail(email)

        if(publicant && await this.#compare(password,publicant.password)){
            return this.#getPublicantData(publicant)
        }

        return {
            error:true,
            message:'ERROR : Email y/o Password incorrectas'
        }
    }

    //REGISTRO
    async signup(data){
        
         //VALIDAR QUE ENVIEN TODOS LOS DATOS Y QUE ROLE SEA APPLICANT O ADMIN
         if (data.name && data.email && data.password  ){
            data.password= await this.#encrypt(data.password)
        }
        const publicantServ = new Publicant()
        const publicant= await publicantServ.create(data)

              
        if(publicant.error){
            return publicant
        }

        return this.#getPublicantData(publicant)
    }

    
    //DATOS DEL USUARIO Y TOKEN
    #getPublicantData(publicant){
        const publicantData={
            name:publicant.name,
            role:publicant.role,
            email:publicant.email,
            id:publicant.id
        }
        const token=this.#createToken(publicantData)
        return{
            publicant:publicantData,
            token
        }
    }

    //CREAR TOKEN con tiempo de expiracion
    #createToken(payload){
        const token= jwt.sign(payload,tokenSecret,{
            expiresIn:tokenExpires}) 
        return token
    }

    //ENCRIPTAR PASSWORD
    async #encrypt(string){
        try{
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(string,salt)
            return hash
        }
        catch(error){
            console.log(error)
        }
    }

    //VERIFICAR SI ES CORRECTA PASSWORD
    async #compare(string,hash){
        return await bcrypt.compare(string,hash)
    }

}


module.exports=AuthPublicant;