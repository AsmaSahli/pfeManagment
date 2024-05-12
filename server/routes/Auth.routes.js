const userController = require("../controllers/UserController");

module.exports=(app)=>{
    app.post("/signin",userController.signin)
    app.post("/signout",userController.signout)
}
