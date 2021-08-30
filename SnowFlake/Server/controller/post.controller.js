const Post = require('../model/post.model');
const multer = require('multer');
const User = require('../model/user.model');

const PostController = {};





PostController.GetPersonalPosts = async (req, res, next) => {

    const Author = req.body.Author;
    
    Post.find({author: Author}, (error, result)=>{
        if(error){
            console.log('failed to get personal posts')
        }else{
            try{
                let sortedArray = result.reverse();
               
                res.send(sortedArray)
            }catch(e){
                next(e)
            }
        }
    })
}

PostController.RemovePost =  (req, res, next) => {
    const PostId =  req.body.PostId;

    Post.deleteOne({_id: PostId}, (err, result)=>{
        if(err){
            console.log('noooo')
        }else{
            res.send({
                message: 'Post Removed'
            })
        }
    })
}

PostController.Like = async (req, res, next) => {
    const PostId = await req.body.PostId0;
    const myId = await req.body.myId;
    console.log("Post" + PostId,"Id" + myId)

    try{

        Post.findOne({_id: PostId}, {likes: true, _id: false}, (err, result)=>{
            if(err){
                console.log('failed to find post')
            }else{
               const check = JSON.stringify(result);
                if(check.includes(myId)){
                    Post.updateOne({_id: PostId}, {$pull: {likes: myId}}, (err, result)=>{
                        if(err){
                            console.log('failed to unlike this post')
                        }else{
                            User.updateOne({_id: myId}, {$pull: {postslike: PostId}}, (err, result)=>{
                                if(err){
                                    console.log('failed to remove this post from postslike')
                                }else{
                                    console.log('removed from postslike')
                                }
                            })
                            res.send('Unliked')
                        }
                    })
                }else{
                    Post.updateOne({_id: PostId}, {$push: {likes: myId}}, (err, result)=>{
                        if(err){
                            console.log('failed to like this post')
                        }else{
                            User.updateOne({_id: myId}, {$push: {postslike: PostId}}, (err, result)=>{
                                if(err){
                                    console.log('failed to put this post in postslike')
                                }else{
                                    console.log('added to postslike')
                                }
                            })
                            res.send('liked and added to your postslike')
                        }
                    })
                }
            }
        })
        
      
    }catch(e){
        next(e)
    }
}

PostController.CheckLikes = async (req, res, next) => {
    
    const myId = await req.body.myId;

    User.findOne({_id: myId}, {postslike: true, _id: false}, (err, result)=>{
        if(err){
            console.log('failed to get your postslike')
        }else{
            res.send(result)
        }
    })
}

PostController.Comment = async (req, res, next) => {
    const myId = req.body.myId;
    const PostId = req.body.ThisCommentPost;
    const CommentText = req.body.CommentText;
    
    try{
        User.findOne({_id: myId}, 'avatar username _id', (err, result)=>{
            if(err){
                console.log('failed to get you information')
            }else{
                
                const commentDetails = {
                    username: result.username,
                    avatar: result.avatar,
                    _id: result._id,
                    commenttext: CommentText,
                }
             
                Post.updateOne({_id: PostId}, {$push: {comments: commentDetails}}, (err, result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.send('comment added')
                    }
                })
            }
        })
    }catch(e){
        next(e)
    }
}

PostController.GetComments =  (req, res, next) => {
    const PostId =  req.body.PostComment;
   
    try{
        Post.findOne({_id: PostId}, {comments: true, _id: false}, (err, result)=>{
            if(err){
                console.log('failed to get the comments of this post')
            }else{
               const reve = result.comments.reverse();
                res.send(reve)
            }
        })
    }catch(e){
        next(e)
    }
}


PostController.TimeLine =  (req, res, next) => {
    const myId = req.body.myId;
    var firstRes = [];
    var secRes = [];
    User.findOne({_id: myId}, {following: true, _id: false}, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            const newFollowing = result.following;
            Promise.all(newFollowing.map(item =>{
                return  Post.findOne({author: item}).exec();
            }))
            .then(ress => {
              firstRes = ress;
               
            })   
           
          setTimeout(()=>{
            firstRes.forEach((element)=>{
                User.findOne({_id: element.author}, {username: true, avatar: true, _id: true}, (err, result)=>{
                    if(err){
                        console.log('faild')
                    }else{
                        newObj = {
                            author: element.author,
                            avatar: result.avatar,
                            username: result.username,
                            likes: element.likes,
                            _id: element._id,
                            text: element.text,
                            photo: element.photo,
                            date: element.date,
                            comments: element.comments
                        }
                        secRes.push(newObj)
                    }
                })
            })
          }, 1000)
           
        }
        
        setTimeout(()=>{
           secRes.reverse();
            res.send(secRes) 
        }, 2000)
        
    })
  
}

module.exports = PostController;