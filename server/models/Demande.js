const mongoose = require("mongoose");

const DemandeSchema =new mongoose.Schema(
    {   
        nomEtudiant:
        {
            type:String,
            required:true

        },
        idEtudiant:
        {
            type:String,
            required:true

        },
        idEncadreur:
        {
            type:String,
            required:true

        },
        nomEncadreur:
        {
            type:String,
            required:true

        },
        
        description:
        {
            type:String,
            required:true,

        },
        commentaire:
        {
            type:String,
        },

        isValid:
        {
            type:Boolean,
            default:false
        }





    },{ timestamps: true });

    const Demande =mongoose.model("Demande",DemandeSchema);
    module.exports=Demande;
