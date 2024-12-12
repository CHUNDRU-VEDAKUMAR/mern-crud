// Function to insert a new student
const postData = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const studentData = {};
    formData.forEach((value, key) => {
        studentData[key] = value;
    });

    const res = await fetch('http://localhost:3000/addstudent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
    });

    const data = await res.json();
    if (data.status === 'success') {
        alert('Student added successfully');
    } else {
        alert('Error adding student');
    }
};

// Function to fetch student by RegdNo
const getStudentData = async (event) => {
    event.preventDefault();

    const regdNo = document.getElementById('accessRegdNo').value;
    const res = await fetch(`http://localhost:3000/${regdNo}`);
    const data = await res.json();

    if (data.status === 'success') {
        const student = data.student;
        document.getElementById('studentDetails').innerHTML = `
            <h3>Student Details:</h3>
            <p>Name: ${student.name}</p>
            <p>Email: ${student.email}</p>
            <p>RegdNo: ${student.RegdNo}</p>
            <p>Mobile No: ${student.mobileNo}</p>
            <p>Department: ${student.department}</p>
        `;
    } else {
        document.getElementById('studentDetails').innerHTML = `No student found with RegdNo ${regdNo}`;
    }
};

// Function to update student data
const updateStudentData = async (event) => {
    event.preventDefault();

    const regdNo = document.getElementById('updateRegdNo').value;
    const updatedData = {
        name: document.getElementById('updateName').value,
        email: document.getElementById('updateEmail').value,
        mobileNo: document.getElementById('updateMobileNo').value,
        department: document.getElementById('updateDepartment').value
    };

    const res = await fetch(`http://localhost:3000/${regdNo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });

    const data = await res.json();
    if (data.status === 'success') {
        alert('Student details updated');
    } else {
        alert('Error updating student details');
    }
};

// Function to delete student
const deleteStudentData = async (event) => {
    event.preventDefault();

    const regdNo = document.getElementById('deleteRegdNo').value;

    const res = await fetch(`http://localhost:3000/${regdNo}`, {
        method: 'DELETE'
    });

    const data = await res.json();
    if (data.status === 'success') {
        alert('Student deleted successfully');
    } else {
        alert('Error deleting student');
    }
};


