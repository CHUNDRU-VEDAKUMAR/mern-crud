const express = require('express');
const connectToDB = require('./connection');
const Student = require('./student.model');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Connect to the database
connectToDB();

// Route to check server status
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Get all students data
app.get("/getstudents", async (req, res) => {
    try {
        const students = await Student.find({});
        return res.status(200).json({ status: 'success', students });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: 'fail', message: err.message });
    }
});

// Get student by RegdNo
app.get("/:id", async (req, res) => {
    try {
        const regdNo = req.params.id;
        const student = await Student.findOne({ RegdNo: regdNo });
        if (student) {
            return res.status(200).json({ status: 'success', student });
        } else {
            return res.status(404).json({ status: 'fail', message: 'Student not found' });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 'fail', message: e.message });
    }
});

// Add new student
app.post("/addstudent", async (req, res) => {
    try {
        const { name, email, RegdNo, mobileNo, department } = req.body;
        const newStudent = new Student({
            name,
            RegdNo,
            department,
            mobileNo,
            email
        });
        await newStudent.save();
        return res.status(200).json({ status: 'success', newStudent });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 'fail', message: e.message });
    }
});

// Update student
app.put("/:id", async (req, res) => {
    try {
        const regdNo = req.params.id;
        const updatedStudent = await Student.findOneAndUpdate(
            { RegdNo: regdNo },
            req.body,
            { new: true }
        );
        if (updatedStudent) {
            return res.status(200).json({ status: 'success', updatedStudent });
        } else {
            return res.status(404).json({ status: 'fail', message: 'Student not found' });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 'fail', message: e.message });
    }
});

// Delete student
app.delete("/:id", async (req, res) => {
    try {
        const regdNo = req.params.id;
        const deletedStudent = await Student.findOneAndDelete({ RegdNo: regdNo });
        if (deletedStudent) {
            return res.status(200).json({ status: 'success', deletedStudent });
        } else {
            return res.status(404).json({ status: 'fail', message: 'Student not found' });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 'fail', message: e.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
