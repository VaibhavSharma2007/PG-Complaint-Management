const API_URL = "http://localhost:3000/api/complaints";

const complaintForm = document.getElementById("complaintForm");
const complaintsList = document.getElementById("complaintsList");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");


// LOAD COMPLAINTS
async function loadComplaints() {

    const search = searchInput.value.trim();
    const status = statusFilter.value;

    let url = API_URL;

    const params = new URLSearchParams();

    if (search) {
        params.append("search", search);
    }

    if (status) {
        params.append("status", status);
    }

    if (params.toString()) {
        url += "?" + params.toString();
    }

    const response = await fetch(url);
    const complaints = await response.json();

    displayComplaints(complaints);
}


// DISPLAY COMPLAINTS
function displayComplaints(complaints) {

    complaintsList.innerHTML = "";

    if (complaints.length === 0) {
        complaintsList.innerHTML = "<p>No complaints found.</p>";
        return;
    }

    complaints.forEach(complaint => {

        const card = document.createElement("div");

        card.className = "complaint-card";

        card.innerHTML = `
            <h3>${complaint.category}</h3>

            <p><strong>Resident:</strong> ${complaint.residentName}</p>

            <p><strong>Room:</strong> ${complaint.roomNumber}</p>

            <p><strong>Description:</strong> ${complaint.description}</p>

            <p><strong>Priority:</strong> ${complaint.priority}</p>

            <p><strong>Status:</strong> ${complaint.status}</p>

            <div class="card-buttons">

                <button onclick="updateComplaint(${complaint.id})">
                    Update
                </button>

                <button class="delete-btn" onclick="deleteComplaint(${complaint.id})">
                    Delete
                </button>

            </div>
        `;

        complaintsList.appendChild(card);
    });
}


// SUBMIT COMPLAINT
complaintForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const complaint = {

        residentName: document.getElementById("residentName").value,

        roomNumber: document.getElementById("roomNumber").value,

        category: document.getElementById("category").value,

        description: document.getElementById("description").value,

        priority: document.getElementById("priority").value
    };

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(complaint)
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.message);
        return;
    }

    alert("Complaint submitted successfully!");

    complaintForm.reset();

    loadComplaints();
});


// UPDATE COMPLAINT
async function updateComplaint(id) {

    // Get the current complaint
    const response = await fetch(`${API_URL}/${id}`);

    const complaint = await response.json();

    let newStatus;

    // Change status step by step
    if (complaint.status === "Pending") {
        newStatus = "In Progress";
    } 
    else if (complaint.status === "In Progress") {
        newStatus = "Resolved";
    } 
    else {
        newStatus = "Pending";
    }

    // Send updated status to backend
    const updateResponse = await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            status: newStatus
        })
    });

    const data = await updateResponse.json();

    if (!updateResponse.ok) {
        alert(data.message);
        return;
    }

    loadComplaints();
}


// DELETE COMPLAINT
async function deleteComplaint(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) {
        return;
    }

    const response = await fetch(`${API_URL}/${id}`, {

        method: "DELETE"
    });

    const data = await response.json();

    alert(data.message);

    loadComplaints();
}


// SEARCH
searchInput.addEventListener("input", loadComplaints);


// STATUS FILTER
statusFilter.addEventListener("change", loadComplaints);


// LOAD COMPLAINTS WHEN PAGE OPENS
loadComplaints();