import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    avatarUrl: {
        type: String, // link CDN de hien thi anh
    },
    avatarId: {
        type: String, // Cloudinary public id de xoa anh
    },
    bio: {
        type: String,
        maxlength: 500
    },
    phone:{
        type: String,
        sparse: true // cho phep null nhung khong duoc trung
    },
    
},
{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);
export default User;