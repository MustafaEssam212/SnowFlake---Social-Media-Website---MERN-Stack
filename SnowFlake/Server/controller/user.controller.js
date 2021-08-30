const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

const userController = {};



userController.register = async (req, res, next) => {
    const { username, email, password } = req.body;   
    const newUser = new User({
        username,
        email,
        password
      }); 

      try{

        User.findOne({email:req.body.email}, function(err, user){
            if(err) {
              res.send({
                  message: `Server Error`
              })
            }
            if(Boolean(user)) {
                res.send({
                    message: `Email Already Exists`
                })
            }
            
          });

          const user = await newUser.save();
          return res.send({ message:  `Register Successfully` });
        
      }catch(e) {
            next(e);
    }
};

userController.login =  async (req, res, next) => {
    const {email, password} = req.body;
  
    try{

        const user = await User.findOne({email});
        if(!user){
            res.send({
                message:  `The Email ${email} Not Found`
            })
        }

        user.isPasswordMatch(password, user.password, (err, success)=>{
                if(success){
                    const secret = process.env.JWT_SECRET;
                    const expire = process.env.JWT_EXPIRATION;
                    
                    const token = jwt.sign({_id: user._id}, secret, {expiresIn: expire});
                       return  res.send({token, user}) 
                }
                res.send({
                    message : `Invaild Email or Password`
                })
        });

    }catch(e){
        next(e);
    };
 
};

userController.getUserInfos =  (req, res, next) => {
    const {email} = req.body;
    User.find({email},  (err, result)=>{
        if(err){
            res.send({
                message: `Faild to get data`
            })
        }else{
            res.send(result[0])
        }
    })  
};

userController.refreshDetails = (req,res, next) => {
    const id = req.body.id;
    

    User.findOne({_id: id},  (error, result)=>{
        if(error){
            console.log('faild to get user data')
        }else{
            res.send(result)

        }
    })
}

userController.updateUsername = (req, res, next) => {
    
   const id = req.body.params.id;
   
   const NewUserName ={
       username: req.body.NewName
   }

   User.updateOne({_id: id}, {$set: NewUserName}, (err, result)=>{
       if(err){
           console.log('failed to update username')
       }else{
           res.send({
               message : 'Username Updated'
           })
       }
   })
    
}

userController.updateUserEmail = (req, res, next) => {
    
    const id = req.body.params.id;
    
    const NewUserEmail ={
        email: req.body.NewEmail
    }
 
    User.updateOne({_id: id}, {$set: NewUserEmail}, (err, result)=>{
        if(err){
            console.log('failed to update email')
        }else{
            res.send({
                message : 'Username Updated'
            })
        }
    })
     
 }

 userController.updateUserBio = (req, res, next) => {
    
    const id = req.body.params.id;
    
    const NewUserBio ={
        bio: req.body.NewBio
    }
 
    User.updateOne({_id: id}, {$set: NewUserBio}, (err, result)=>{
        if(err){
            console.log('failed to update email')
        }else{
            res.send({
                message : 'Userbio Updated'
            })
        }
    })
     
 }

 userController.updateUserStuding = (req, res, next) => {
    
    const id = req.body.params.id;
    
    const NewUserStuding ={
        studing: req.body.NewStuding
    }
 
    User.updateOne({_id: id}, {$set: NewUserStuding}, (err, result)=>{
        if(err){
            console.log('failed to update email')
        }else{
            res.send({
                message : 'UserStuding Updated'
            })
        }
    })
     
 }

 
 userController.updateUserLiving = (req, res, next) => {
    
    const id = req.body.params.id;
    
    const NewUserLiving ={
        living: req.body.NewLiving
    }
 
    User.updateOne({_id: id}, {$set: NewUserLiving}, (err, result)=>{
        if(err){
            console.log('failed to update email')
        }else{
            res.send({
                message : 'UserLiving Updated'
            })
        }
    })
     
 }

 userController.updateUserRelation = (req, res, next) => {
    
    const id = req.body.params.id;
    
    const NewUserRelation ={
        relationship: req.body.NewRelation
    }
 
    User.updateOne({_id: id}, {$set: NewUserRelation}, (err, result)=>{
        if(err){
            console.log('failed to update email')
        }else{
            res.send({
                message : 'UserRelation Updated'
            })
        }
    })
     
 }

 userController.updateUserJob = (req, res, next) => {
    
    const id = req.body.params.id;
    
    const NewUserJob ={
        job: req.body.NewJob
    }
 
    User.updateOne({_id: id}, {$set: NewUserJob}, (err, result)=>{
        if(err){
            console.log('failed to update email')
        }else{
            res.send({
                message : 'UserJob Updated'
            })
        }
    })
     
 }

 userController.updateUserGender = (req, res, next) => {
    
    const id = req.body.params.id;
    
    const NewUserGender ={
        gender: req.body.NewGender
    }
 
    User.updateOne({_id: id}, {$set: NewUserGender}, (err, result)=>{
        if(err){
            console.log('failed to update email')
        }else{
            res.send({
                message : 'UserGender Updated'
            })
        }
    })
     
 }

 userController.AnotherProfile = async (req, res, next) => {
     const ID = await req.body.newId;
   
     User.findOne({_id: ID} , (err, result)=>{
         if(err){
             console.log('failed to get another user data')
         }else{
             res.send(result)
         }
     })
 }

 userController.Follow =  (req, res, next) => {
     const IdFollow = req.body.IdFollow; 
     const myId =  req.body.myId;
    
    try{
        User.updateOne({_id: myId}, {$push: {following: IdFollow}}, (err, result)=>{
            if(err){
                console.log('failed to add this to following')
            }else{
                console.log('this person added to your following')
            }
        })
        User.updateOne({_id: IdFollow}, {$push: {followers: myId}}, (err, result)=>{
           if(err){
               console.log('failed to add you in his followers')
           }else{
               console.log('you followed this person')
           }
           res.send('Done')
       })
    }catch(e){
        next(e)
    }
   
 }

 userController.CheckFollowing = async(req, res, next) =>{

    const newMyId = await req.body.myId;
    const IdFollow = await req.body.IdFollow;

    User.findOne({_id: newMyId}, {following: true, _id: false}, (err, result)=>{
        if(err){
            console.log('failed to get your information')
        }else{ 
           
         const check = JSON.stringify(result)
           if(check.includes(IdFollow)){
            res.send(true)
           }else{
            res.send(false)
           }
           
        }
    })
 }

 userController.UnFollow = (req, res, next) => {
    const IdFollow = req.body.IdFollow; 
    const myId =  req.body.myId;
  try{
    User.updateOne({_id: myId}, {$pull: {following: IdFollow}}, (err, result)=>{
        if(err){
            console.log('failed to remove this from following')
        }else{
            console.log('this person removed from your following')
        }
    })
    User.updateOne({_id: IdFollow}, {$pull: {followers: myId}}, (err, result)=>{
        if(err){
            console.log('failed to remove you from this person"s followers')
        }else{
            console.log("you have been removed from this person's followers")
           
        }
        
    })
    res.send('ddddddd')
  }catch(e){
      next(e)
  }
 }


 userController.getContacts =  (req, res, next) => {
     const myId = req.body.myId;

        
       
     User.findOne({_id: myId}, {following: true, _id: false},  (err, result)=>{
         if(err){
             console.log('failed to get your following')
         }else{
           
            
                var following =  result.following;   
           
                Promise.all(following.map(item =>{
                    return  User.findOne({_id: item}, {avatar: true, _id: true, username: true}).exec();
                }))
                .then(ress => res.send(ress))
           
           
        
         }
        
     })
     
    
 }  

module.exports = userController;