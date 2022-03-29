const userModel = require('../models/userModel')




const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}




const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const registerUser = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide user details' })
            return
        }

        // Extract params
        let {  fname,lname,city,company } = requestBody; // Object destructing

        // Validation starts

      

        if (!isValid(fname)) {
            res.status(400).send({ status: false, message: ' fname is required' })
            return
        }

        if (!isValid(lname)) {
            res.status(400).send({ status: false, message: ' lname is required' })
            return
        }
        

        if (!isValid(city)) {
            res.status(400).send({ status: false, message: `city is mandatory` })
            return
        }
        if (!isValid(company)) {
            res.status(400).send({ status: false, message: `company is mandatory` })
            return
        }
        let isCompanyAlredyPresent = await userModel.findOne({ company: company })
        if (isCompanyAlredyPresent) {
            return res.status(400).send({ status: false, message: ` company Already Present` });
        }


       

        const userData = {fname,lname,city,company }
        const newUser = await userModel.create(userData);

        res.status(201).send({ status: true, message: `user created successfully`, data: newUser });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


const getUsers=async function(req,res){

    try{
         const queryParams=req.query
        let filterQuery= {};
        let {fname, lname,city}=queryParams

            
            if (fname) {
                filterQuery["fname"] = fname
            }
            if (lname) {
                filterQuery["lname"] = lname
            }
            
            if (city) {
                filterQuery["city"] = city
            }

            let User = await userModel.find(filterQuery)
            
            if (User.length > 0) {
                res.status(200).send({ status: true,message:'user list', data: User })
              }
              else {
                res.status(404).send({ msg: "user not find" })
              }
            
         }catch(error){
        res.status(500).send({status:true,message:error.message})
    }

}

const getusersById = async function (req, res) {

    const userId = req.params.userId

    if(!isValid(userId)) {
        res.status(400).send({status: false, message: 'userId  is required'})
        return
    }

    let userDetails = await userModel.findOne({ _id: userId })
    if (!userDetails) {
        res.status(404).send({ status: false, message: "No user found" })
        return
    }
 
    return res.status(200).send({ status: true, message: 'user list', data:userDetails})
}


const getUserByCity=async function(req,res){

    try{
        const queryParams=req.query
       let filterQuery= {};
       let {fname, lname,city}=queryParams

           
           if (fname) {
               filterQuery["fname"] = fname
           }
           if (lname) {
               filterQuery["lname"] = lname
           }
           
           if (city) {
               filterQuery["city"] = city
           }

           let User = await userModel.find(filterQuery)
           
           if (User.length > 0) {
               res.status(200).send({ status: true,message:'city list', data: User })
             }
             else {
               res.status(404).send({ msg: "city not find" })
             }
           
        }catch(error){
       res.status(500).send({status:true,message:error.message})
   }

}








module.exports = { registerUser,getUsers,getusersById, getUserByCity }

