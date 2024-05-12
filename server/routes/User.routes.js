const userController = require("../controllers/UserController");

module.exports=(app)=>{

    app.post("/createUser",userController.createUser);
    app.get("/findAllUsers",userController.getUsers);
    app.get("/getOneUser/:id",userController.getUserById);
    app.patch("/UpdateUser/:id",userController.updateUser);


}