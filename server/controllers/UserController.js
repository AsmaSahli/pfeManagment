const User =require("../models/User")
const e = require("../utils/error");
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");
module.exports={

    createUser:async(req, res, next) =>{

        const {nom,prenom,cin,role,password}=req.body;
        if (
            !nom||
            !prenom||
            !cin||
            !role||
            !password

        ){
            next(e.errorHandler(400,'All Fields Are Required'))
        }
        const registredUser= await User.findOne({cin:req.body.cin})
        if(registredUser){
            return next(e.errorHandler(400, 'User already registered'))
        }
        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser =new User({
            nom:nom,
            prenom:prenom,
            cin:cin,
            role:role,
            password:hashedPassword,

        });
        try {
            await newUser.save();
            res.json("Signup successful")


        }
        catch(error){
            next(error);

        }

    },

    getUsers:async(req,res)=>{
        User.find()
        .then((allUsers)=>res.status(200).json(allUsers))
        .catch((err) => {res.status(400).json(err)})


    },

    getUserById:async(req,res)=>{
        User.findById({_id:req.params.id})
        .then((oneUser)=>res.status(200).json(oneUser))
        .catch((err) => {res.status(400).json(err)})


    },
    updateUser : async (req, res, next) => {

        if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(e.errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                {
                    $set: {
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                    Encadreur:req.body.Encadreur
                    },
                },
                { new: true }
                );
                const { password, ...rest } = updatedUser._doc;
                res.status(200).json(rest);
            } catch (error) {
                next(error);
            }
        

    } ,

    signin:async(req,res,next)=>{
        const {cin,password}=req.body;
        if(!cin || !password ){
            next(e.errorHandler(400,'All Fields Are Required'))

        }
        try {
            const validateUser =await User.findOne({cin});
            if(!validateUser){
                next(e.errorHandler(400,'User Not Found')) 

            }
            const validPassword=bcrypt.compareSync(password,validateUser.password)
            if(!validPassword){
                next(e.errorHandler(400,'Invalid Password '))
                

        }
        const token =jwt.sign(
            { id:validateUser._id,  },
            process.env.jwt_secret


        );
        const {password :pass ,...rest}=validateUser._doc;
        res
        .status(200)
        .cookie('access_token',token ,{
            httponly:true,
        })
        .json(rest);

    }
    catch (error){
        next(error);
    }



    },

    signout :(req,res,next)=>{
        try{
            res
            .clearCookie('access_token')
            .status(200)
            .json('User has been signed out');


        }
        catch(error){
            next(error);
        }
    }


    












}