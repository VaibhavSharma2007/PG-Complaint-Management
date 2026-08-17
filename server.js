const express = require("express");

const app = express();

app.use(express.json());

let complaints = [];


// HOME
app.get("/", (req, res) => {
    res.send("PG Complaint Management System");
});


// CREATE A COMPLAINT
app.post("/api/complaints", (req, res) => {

    const {
        residentName,
        roomNumber,
        category,
        description,
        priority
    } = req.body;

    // Basic validation
    if (
        !residentName ||
        !roomNumber ||
        !category ||
        !description ||
        !priority
    ) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }

    const complaint = {
        id: complaints.length + 1,
        residentName,
        roomNumber,
        category,
        description,
        priority,
        status: "Pending"
    };

    complaints.push(complaint);

    res.status(201).json(complaint);
});


// GET ALL COMPLAINTS + SEARCH + FILTER
app.get("/api/complaints", (req, res) => {

    const { search, status } = req.query;

    let result = complaints;

    // Search by name, room, category or description
    if (search) {

        result = result.filter(c =>
            c.residentName.toLowerCase().includes(search.toLowerCase()) ||
            c.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
            c.category.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Filter by status
    if (status) {
        result = result.filter(c => c.status === status);
    }

    res.json(result);
});


// GET ONE COMPLAINT
app.get("/api/complaints/:id", (req, res) => {

    const id = Number(req.params.id);

    const complaint = complaints.find(c => c.id === id);

    if (!complaint) {

        return res.status(404).json({
            message: "Complaint not found"
        });
    }

    res.json(complaint);
});


// UPDATE A COMPLAINT
app.put("/api/complaints/:id", (req, res) => {

    const id = Number(req.params.id);

    const complaint = complaints.find(c => c.id === id);

    if (!complaint) {

        return res.status(404).json({
            message: "Complaint not found"
        });
    }

    Object.assign(complaint, req.body);

    res.json(complaint);
});


// DELETE A COMPLAINT
app.delete("/api/complaints/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = complaints.findIndex(c => c.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "Complaint not found"
        });
    }

    const deletedComplaint = complaints.splice(index, 1);

    res.json({
        message: "Complaint deleted successfully",
        complaint: deletedComplaint[0]
    });
});


// START SERVER
app.listen(3000);