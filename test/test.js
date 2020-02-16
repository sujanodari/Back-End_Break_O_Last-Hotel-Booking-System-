var chai =require("chai");
var chaiHttp=require("chai-http");
var should=chai.should();

chai.use(chaiHttp);
var server=require("../break.js");
describe("Users",function(){
  describe("POST user registration test",function(){

    it("it should register a single user, provided phone is unique and password, comform password, gender, email, address, username, profile image name is entered",function(done){
        //now request api
        chai.request(server)
        .post("/api/v1/users/signup")
        .set("content-type","application/x-www-form-urlencoded")
        .send({
            
            "username":"Sujan Odari",
            "password":"sujan",
            "cPassword":"sujan",
            "profileImage":"sujan.jpg",
            "gender":"male",
            "email":"sujanodari@gmail.com",
            "phone":"1234567890123456",
            "address":"Gatthaghar"
        })
        .end(function(err,res){
          //res.should.have,thinks,like
          //res.should.be
          res.should.have.status(201);
          res.body.should.have.property("messsage").eql("User is Registered");
          done();
        });
    });
  }
  );
});
describe("Users",function(){
  describe("POST user registration test",function(){

    it("it should not register a single user, provided username is not unique and password, comform password, gender, email, address, username, profile image name is entered",function(done){
        //now request api
        chai.request(server)
        .post("/api/v1/users/signup")
        .set("content-type","application/x-www-form-urlencoded")
        .send({
            
            "username":"Sujan Odari",
            "password":"sujan",
            "cPassword":"sujan",
            "profileImage":"sujan.jpg",
            "gender":"male",
            "email":"sujanodari@gmail.com",
            "phone":"1234567890123456",
            "address":"Gatthaghar"
        })
        .end(function(err,res){
          //res.should.have,thinks,like
          //res.should.be
          res.should.have.status(409);
          res.body.should.have.property("message").eql("User already exist");
          done();
        });
    });
  }
  );
});

describe("Users",function(){
  describe("POST user login test",function(){

    it("it should login a single user, provided registered phone and password is entered",function(done){
        //now request api
        chai.request(server)
        .post("/api/v1/users/signin")
        .set("content-type","application/x-www-form-urlencoded")
        .send({
            
            "phone":"1234567890123456",
            "password":"sujan"
        })
        .end(function(err,res){
          //res.should.have,thinks,like
          //res.should.be
          res.should.have.status(202);
          res.body.should.have.property("status").eql("Success");
          done();
        });
    });
  }
  );
});



describe("Users",function(){
    describe("POST user login test",function(){
  
      it("it should not login a single user, provided unregistered phone and password is entered",function(done){
          //now request api
          chai.request(server)
          .post("/api/v1/users/signin")
          .set("content-type","application/x-www-form-urlencoded")
          .send({
              
              "phone":"1234567890123",
              "password":"sujan"
          })
          .end(function(err,res){
            //res.should.have,thinks,like
            //res.should.be
            res.should.have.status(204);
            done();
          });
      });
    }
    );
  });



var Token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijk4MDQ5NjYzNzciLCJ1c2VybGV2ZWwiOiJzdXBlcmFkbWluIiwiaWF0IjoxNTgxODU2NjU3LCJleHAiOjE1ODE4OTI2NTd9.NaKMs-tGKnqufNomR78SgvVvRmXnipgVNmj0-RMWwh8";
describe("Users",function(){
    describe("get user detail test",function(){
  
        it("it should get user detail, provided token is authorized", function(done) {
            chai
              .request(server)
              .get("/api/v1/users") //then get the data
              .set("Authorization", "Bearer " + Token) //set the header first
              .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.have.property("status").eql("success");
                done();
              });
         });
    }
    );
  });


describe("Users",function(){
      describe(" get user detail test",function(){
    
          it("it should not get user detail, provided token is not authorized", function(done) {
              chai
                .request(server)
                .get("/api/v1/users") //then get the data
                .set("Authorization", "Bearer " + Token+"sujan") //set the header first
                .end(function(err, res) {
                  res.should.have.status(403);
                  res.body.should.have.property("status").eql("unauthorized");
                  done();
                });
           });
      }
      );
    });




    describe("Users",function(){
        describe("put user password update test",function(){
      
            it("it should get user password updated, provided token is  authorized and new password is entered", function(done) {
                chai
                  .request(server)
                  .put("/api/v1/users") //then get the data
                  .set("content-type","application/x-www-form-urlencoded")
                  .set("Authorization", "Bearer " + Token) //set the header first
                  .send({
                    "password":"sujan"
                })
                  .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property("status").eql("success");
                    done();
                  });
             });
        }
        );
      });


      describe("Users",function(){
        describe("put user password update test",function(){
      
            it("it should not get user password updated, provided token is  unauthorized and new password is entered", function(done) {
                chai
                  .request(server)
                  .put("/api/v1/users") //then get the data
                  .set("content-type","application/x-www-form-urlencoded")
                  .set("Authorization", "Bearer " + Token+"sujan") //set the header first
                  .send({
                    "password":"sujan"
                })
                  .end(function(err, res) {
                    res.should.have.status(403);
                    res.body.should.have.property("status").eql("unauthorized");
                    done();
                  });
             });
        }
        );
      });




      describe("Hotel",function(){
        describe("POST Hotel addition test",function(){
      
          it("it should add a hotel, provided hotel name and room number is unique and address, no of bed, phone, description and room image location is entered",function(done){
              //now request api
              chai.request(server)
              .post("/api/v1/hotel/rooms")
              .set("content-type","application/x-www-form-urlencoded")
              .send({
                  
                  "hotelName":"Sunsine",
                  "roomNo":"999",
                  "description":"Hightly decorated room only in RS.5000",
                  "address":"sujan.jpg",
                  "noOfBed":"2",
                  "phone":"9876503210",
                  "roomImage":"12.jpg"
              })
              .end(function(err,res){
                //res.should.have,thinks,like
                //res.should.be
                res.should.have.status(201);
                res.body.should.have.property("status").eql("success");
                done();
              });
          });
        }
        );
      });

      describe("Hotel",function(){
        describe("POST Hotel addition test",function(){
      
          it("it should not add a hotel, provided hotel name and room number is not unique and address, no of bed, phone, description and room image location is entered",function(done){
              //now request api
              chai.request(server)
              .post("/api/v1/hotel/rooms")
              .set("content-type","application/x-www-form-urlencoded")
              .send({
                  
                "hotelName":"Sunsine",
                "roomNo":"999",
                "description":"Hightly decorated room only in RS.5000",
                "address":"sujan.jpg",
                "noOfBed":"2",
                "phone":"9876503210",
                "roomImage":"12.jpg"
              })
              .end(function(err,res){
                //res.should.have,thinks,like
                //res.should.be
                res.should.have.status(409);
                res.body.should.have.property("status").eql("error");
                done();
              });
          });
        }
        );
      });



      describe("Hotel",function(){
        describe("get rooms detail test",function(){
      
            it("it should get rooms detail", function(done) {
                chai
                  .request(server)
                  .get("/api/v1/hotel/rooms") //then get the data
                  .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                  });
             });
        }
        );
      });