const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    RegdNo: String,
    department: String,
    mobileNo: Number,
    email: String
});

// Modeling the student
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
