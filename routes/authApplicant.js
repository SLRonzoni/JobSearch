const express=require("express");
const AuthService=require("../services/authApplicant")

function authApplicant(app){

    const router = express.Router()
    const authServ=new AuthService()
    app.use("/api/authApplicant",router)

    router.post("/login",async (req,res)=>{
        const result = await authServ.login(req.body)
        return res.status(result.error ? 400 : 200).json(result)
    })

    router.post("/signup",async (req,res)=>{
        const result = await authServ.signup(req.body)
        return res.status(result.error ? 400 : 200).json(result)
    })
}


module.exports=authApplicant;

