const jwt=require('jsonwebtoken');
const {tokenSecret, tokenExpires, roleApplicants}= require('../config')

const bcrypt=require('bcrypt')
const Applicant=require("./applicants")

class AuthApplicant{
    
    //LOGUEO
    async login(data){
        const {email,password}=data
        const applicantServ=new Applicant()
        const applicant=await  applicantServ.getByEmail(email)

        if(applicant && await this.#compare(password,applicant.password)){
            return this.#getApplicantData(applicant)
        }

        return {
            error:true,
            message:'ERROR : Email y/o Password incorrectas'
        }
    }

    //REGISTRO
    async signup(data){
        //VALIDAR QUE ENVIEN TODOS LOS DATOS Y QUE ROLE SEA APPLICANT O ADMIN
        if (data.name && data.lastName && data.email && data.password  ){
            data.password= await this.#encrypt(data.password)
        }
        const applicantServ = new Applicant()
        const applicant= await applicantServ.create(data)

        
        if(applicant.error){
            return applicant
        }

        return this.#getApplicantData(applicant)
    }

    
    
    //DATOS DEL USUARIO Y TOKEN
    #getApplicantData(applicant){
        const applicantData={
            name:applicant.name,
            lastName:applicant.lastName,
            role:applicant.role,
            email:applicant.email,
            id:applicant.id
        }
        const token=this.#createToken(applicantData)
        return{
            applicant:applicantData,
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


module.exports=AuthApplicant;