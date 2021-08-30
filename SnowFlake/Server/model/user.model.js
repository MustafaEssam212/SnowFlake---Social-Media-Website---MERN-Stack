const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    username : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    avatar : {type: String, required: false, default: null},
    followers : [String],
    following : [String],
    cover : {type: String, required: false, default: null},
    bio : {type: String, required: false, default: 'Write something about you'},
    studing : {type: String, required: false, default: 'Not Selected'},
    living : {type: String, required: false, default: 'Not Selected'},
    relationship : {type: String, required: false, default: 'Not Selected'},
    job : {type: String, required: false, default: 'Not Selected'},
    gender : {type: String, required: false, default: 'Not Selected'},
    verified : {type: String, required: false, default: null},
    postslike: [String],
});



userSchema.pre('save', async function(next) {
    //Check if password is not modified
    if (!this.isModified('password')) {
      return next();
    }
  
    //Encrypt the password
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (e) {
      return next(e);
    }
  });

  userSchema.methods.isPasswordMatch = function (password, hashed, callback){
    bcrypt.compare(password, hashed, (err, success)=>{
        if(err){
          return callback(err);
        }

        callback(null, success);
    });
  };

  userSchema.methods.toJSON = function(){
    const userObject = this.toObject(); 
    delete userObject.password;
    return userObject; 
  };


module.exports = mongoose.model('User', userSchema);