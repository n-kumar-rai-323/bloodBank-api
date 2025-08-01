const mongoose = require("mongoose");
const { UserRole, Gender, bloodType, UserStatus } = require("../../config/constants");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:[UserRole.ADMIN,UserRole.DONOR,UserRole.RECIPIENT,UserRole.BLOOD_BANK],
        default:UserRole.DONOR
    },
    gender:{
        type:String,
        enum:[Gender.FEMALE, Gender.MALE, Gender.OTHER],
        required: true
    },
   
    lastDonationDate:{
        type: Date,
        default: null 
    },
    isAvailableForDonation:{
        type:Boolean,
        default:true
    },
    bloodGroup:{
        type:String,
        enum:[bloodType.A_POSITIVE, bloodType.A_NEGATIVE, bloodType.B_POSITIVE, bloodType.B_NEGATIVE,bloodType.O_POSITIVE, bloodType.O_NEGATIVE,bloodType.AB_POSITIVE,bloodType.AB_NEGATIVE],
        required:true
    },
    phone:{
        countryCode: Number, 
        phone: Number
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:[UserStatus.ACTIVE, UserStatus.INACTIVE],
        default:UserStatus.INACTIVE
    },
    image:{
        url: String,
        optimizedUrl: String,
    },
    activationCode: String,
    forgetPasswordCode: String,
    expiryDate:Date,
}, {
    timestamps: true ,
    autoCreate:true,
    autoIndex:true
});

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;