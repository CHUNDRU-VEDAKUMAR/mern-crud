const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/students");
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error(e);
    }
};

module.exports = connectToDB;
