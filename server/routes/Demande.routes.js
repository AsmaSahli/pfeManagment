const demandeController = require("../controllers/DemandeController");

module.exports=(app)=>{

    app.post("/createDemande",demandeController.createDeamnde);
    app.get("/findAllDemandes",demandeController.getAllDemandes);
    app.get("/getOneDemande/:id",demandeController.getOneDemande);
    app.patch("/updatedemande/:id",demandeController.updatedemande);
    app.delete("/deletedemande/:id",demandeController.deletedemande);


}