const Demande = require("../models/Demande");
const e = require("../utils/error");
module.exports = {
        createDeamnde: async (req, res, next) => {
            try {
            const {idEtudiant,idEncadreur, nomEtudiant,  nomEncadreur ,description,commentaire } = req.body;
        

            if (!req.body.description|| !req.body.commentaire) {
                return next(e.errorHandler(400, 'Please provide all required fields'));
            }
        
            const newDemande = new Demande({
                idEtudiant,
                idEncadreur,
                nomEtudiant,
                nomEncadreur,
                description,
                commentaire


            });
            await newDemande.save();
        
            res.status(200).json(newDemande);
            } catch (error) {
            next(error);
            }
        },
        getAllDemandes: async (req, res, next) => {
            try {
                const demandes = await Demande.find();
                res.status(200).json(demandes);
            } catch (error) {
                next(error);
            }
        },
        getOneDemande: async (req, res, next) => {
            try {
                const { id } = req.params; 
                const demande = await Demande.findOne({ idEtudiant: id }); 
                if (!demande) {
                    return next(e.errorHandler(404, "Aucune demande Trouvee!"));
                }
                res.status(200).json(demande);
            } catch (error) {
                next(error);
            }
        },
        
        

        deletedemande : async (req, res, next) => {

                try {
                await Demande.findByIdAndDelete(req.params.id);
                res.status(200).json('The Request has been deleted');
                } catch (error) {
                next(error);
                }
            },
        

        updatedemande :async (req, res, next) => {

                try {
                const updatedDemande = await Demande.findByIdAndUpdate(
                    req.params.id,
                    {
                    $set: {
                        isValid: true,
                        

                    },
                    },
                    { new: true }
                );
                res.status(200).json(updatedDemande);
                } catch (error) {
                next(error);
                }

            },

}