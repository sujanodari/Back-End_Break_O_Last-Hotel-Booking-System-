        var user = require("../models/UserModel.js");
        const bcrypt = require("bcrypt");
        var jwt = require("jsonwebtoken");
        function loginValidator(req,res,next){
            if(req.body.phone===null){
                res.send("Phone Number cannot be null");
            }
            if(req.body.password===null){
                res.send("password cannot be null");
            }
            user.findOne({
                where:{phone:req.body.phone}
            })
            .then(function(result){
                if(result===null){
                    res.status(204);
                    res.json({
                    status:"Unsuccessfull",
                    code:"204",
                    message:"You have not registered, please register first"}); 
                }
                else{
                    //console.log(result);
                    req.passwordFromDB=result.dataValues.password;
                    next();
                }
            }).catch(function(err){
                next(err);
            });
        }
        function adminValidation(req,res,next){
            if(req.body.phone===null){
                res.send("Phone Number cannot be null");
            }
            if(req.body.password===null){
                res.send("password cannot be null");
            }
            if(req.body.phone==="1234" && req.body.password==="sujan"){
                next();
            }else {
                res.status(204);
                res.json({
                    status:"Unsuccessfull",
                    code:"204",
                });
            }
        }

        function chkLogin(req,res,next){
            if(req.passwordFromDB !==null){
                bcrypt.compare(req.body.password, req.passwordFromDB).then(function(res) {
                    next();  
                }).catch(function(err){
                    next("Hassing error");

                });  
            } else{
                 res.status(204);
                res.json({
                    status:"Unsuccessfull",
                    code:"204",
                });
            }
        
        }

        function jwtTokenGen(req,res,next){
            var payloadd={
                username:req.body.phone,
                userlevel:"superadmin"
            }
        
        jwt.sign(payloadd,"thisIsSecreatKey",{expiresIn:"10h"},
        function(err,resultToken){
            req.token=resultToken;
            next();
        });
        }
        
        
      
        function login(req,res,next){
           // console.log(req.token);
            if(req.token !== null){
                
	    res.status(202);
            res.json({
                status:"Success",
                usertoken:req.token});
            }
        }

        module.exports={loginValidator,adminValidation,
            chkLogin,jwtTokenGen,login};
        
