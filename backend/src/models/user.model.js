import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,   
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    bio : {
        type : String,
        default : '',
        trim : true,
    },
    profilePicture : {
        type : String,
        default : '',
        trim : true,
    },
    friends : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
    friendRequests : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
},{timestamps : true});

const User = mongoose.model('User', userSchema);
export default User;