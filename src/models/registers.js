const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required : true
    },
    lastname : {
        type:String,
        required : true
    },
    email : {
        type:String,
        required : true,
        unique : true
    }

})

const Register = new mongoose.model("Register",studentSchema);
module.exports = Register;