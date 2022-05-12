require('dotenv').config()

const config={
    env:process.env.NODE_ENV,
    port:process.env.PORT,
    dbUserName:process.env.DB_USERNAME,
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST,
    dbName:process.env.DB_NAME,
    tokenSecret:process.env.TOKEN_SECRET,
    tokenExpires:process.env.TOKEN_EXPIRES,
    roleAdminOnly:process.env.ROLE0,
    roleUsers:process.env.ROLE1,
    roleApplicants:process.env.ROLE2,
    rolePublicants:process.env.ROLE3,
}

module.exports=config

