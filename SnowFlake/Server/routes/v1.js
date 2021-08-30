const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const passport = require('passport');
const multer = require('multer');
const User = require('../model/user.model');


const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, '../Client/public/Images/Profiles');
    },
    filename: (req, file, callback) =>{
        callback(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
})
const upload = multer({storage: storage});


//Cover Multer
const Coverstorage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, '../Client/public/Images/Covers');
    },
    filename: (req, file, callback) =>{
        callback(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
})

const CoverUpload = multer({storage: Coverstorage});

// Auth And Register
router.post('/register', userController.register);
router.post('/auth', userController.login);
router.post('/getuser', userController.getUserInfos);
router.post('/refreshDetails', userController.refreshDetails)
router.post('/updateusername', userController.updateUsername)
router.post('/updateuseremail', userController.updateUserEmail)
router.post('/updateuserbio', userController.updateUserBio)
router.post('/uploadProfilePic', upload.single('prof'), (req, res, next)=>{
    


    const id = (req.body.id);
    const newImage = {
        avatar: req.file.filename
    }

    User.updateOne({_id: id}, {$set: newImage}, (err, result)=>{
        if(err){
            console.log('Error to update avatar')
        }else{
            res.send('Done')
        }
    });

   
});
router.post('/updateuserstuding', userController.updateUserStuding)
router.post('/refresh' , (req, res, next)=>{
    const id = req.body.id;
    User.findOne({_id : id}, 'avatar cover username' , (error, result)=>{
        if(error){
            console.log('faild to get data')
        }else{
            res.send(result)
           
        }
    })
});
router.post('/updateuserliving',  userController.updateUserLiving)
router.post('/uploadcover', CoverUpload.single('cover'), (req,res,next)=>{
    const id = (req.body.id);
    
    const newCover = {
        cover: req.file.filename
    }
    User.updateOne({_id: id}, {$set: newCover}, (err, result)=>{
        if(err){
            console.log('Error to update avatar')
        }else{
            res.send('Done')
        }
    });
})
router.post('/updateuserrelation',  userController.updateUserRelation)
router.post('/updateuserjob',   userController.updateUserJob)
router.post('/updateusergender',    userController.updateUserGender)
router.post('/anotherprofile',    userController.AnotherProfile)
router.post('/search', async (req, res, next)=>{
    const value = await req.body.value;
    User.find({username: value}, 'avatar username gender followers verified', (err, result)=>{
        if(err){
            console.log('failed to get users')
        }else{
            res.send(result)
        }
    })
});
router.post('/follow',   userController.Follow)
router.post('/checkfollow',   userController.CheckFollowing)
router.post('/unfollow',   userController.UnFollow)
router.post('/getcontacts', userController.getContacts)
// Customize And Protect Routes

router.all('*', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err || !user){
            res.send({
                message: `Your Are Not Allowed to Access This Page`
            });
        }
        req.user = user;
        return next();
    })(req, res, next);
});

// Protected Routes




module.exports = router;
