const mongoose = require("mongoose");

const UserSchema =new mongoose.Schema(
    {
        nom:
        {
            type:String,
            required:true

        },
        prenom:
        {
            type:String,
            required:true

        },
        Encadreur:
        {
            type:String,
            default:"Aucun encadreur affecté"

        },
        cin:
        {
            type:String,
            required:true,
            unique:true 

        },


        option:
        {
            type:String,
        },

        role:
        {
            type:String,
            required:true
        },
        
        profilePicture: {
            type: String,
            default:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        },

        password:
        {
            type:String,
            required:true,
        }




    },{ timestamps: true });

    const User =mongoose.model("User",UserSchema);
    module.exports=User;
