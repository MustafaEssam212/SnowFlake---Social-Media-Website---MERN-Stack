const express = require('express');
const prouter = express.Router();
const multer = require('multer');
const PostController = require('../controller/post.controller');
const Post = require('../model/post.model');

const PostStorage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, '../Client/public/Images/Posts');
    },
    filename: (req, file, callback) =>{
        callback(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
})

const PostUpload = multer({storage: PostStorage});


prouter.post('/createpost', PostUpload.single('PostImage'), async (req, res, next) => {

    if(req.file){ // If the user upload a post with picture
        
        const PostImage =  req.file.filename;
        const Author = req.body.Author;
        const Text = req.body.Text;
       
        try{    
            const NewPost = new Post({
                text: Text,
                photo: PostImage,
                author: Author
            })
            const post = await NewPost.save();
            res.send({
                message: 'Post Uploaded'
            })
            
        }catch(e){
            next(e)
        }

    }else{ // If the user posted a text 
        const Author = req.body.Author;
        const Text = req.body.Text;

        try{

            const NewPost = new Post({
                text: Text,
                author: Author
            })
            const post = await NewPost.save();
            res.send({
                message: 'Text Uploaded'
            })

        }catch(e){
            next(e)
        }
    }
   

});

prouter.post('/getpersonalposts', PostController.GetPersonalPosts);

prouter.post('/deletepost', PostController.RemovePost)

prouter.post('/like', PostController.Like)

prouter.post('/checklikes', PostController.CheckLikes)

prouter.post('/comment', PostController.Comment)

prouter.post('/getcomments', PostController.GetComments)

prouter.post('/timeline', PostController.TimeLine)  

module.exports = prouter;