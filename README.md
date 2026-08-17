# PG-Complaint-Management
A simple PG Complaint Management System built using HTML, CSS, JavaScript, Node.js and Express.js.


# PG Complaint Management System

A simple full-stack web application designed to help PG (Paying Guest) residents submit and manage complaints related to their accommodation.

The system provides an easy way for residents to register complaints and allows complaints to be viewed, searched, filtered, and managed based on their status.

##  Features

*  Submit a new complaint
*  View all submitted complaints
*  Search complaints
*  Filter complaints by status
*  Update complaint status
*  Delete complaints
*  REST API using Express.js
*  Simple and user-friendly frontend
*  Frontend connected to backend API

##  Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### Development Tools

* Visual Studio Code
* Postman
* Git & GitHub

##  Project Structure

```text
PG-Complaint-Management/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

##  How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/VaibhavSharma2007/PG-Complaint-Management.git
```

### 2. Open the Project

```bash
cd PG-Complaint-Management
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Start the Backend Server

```bash
node server.js
```

The backend server will run on:

```text
http://localhost:3000
```

### 5. Open the Frontend

Open the `frontend/index.html` file in your browser.

The frontend communicates with the backend through the REST API.

## 🔌 API

The backend provides API endpoints for managing complaints.

### Get All Complaints

```http
GET /api/complaints
```

Returns all complaints.

### Add a Complaint

```http
POST /api/complaints
```

Creates a new complaint.

Example request:

```json
{
  "name": "Rahul",
  "room": "101",
  "category": "Electricity",
  "description": "The room light is not working"
}
```

### Update a Complaint

```http
PUT /api/complaints/:id
```

Updates an existing complaint, such as changing its status.

### Delete a Complaint

```http
DELETE /api/complaints/:id
```

Deletes a complaint.

##  Search and Filtering

The application allows users to:

* Search complaints using keywords
* Filter complaints based on their status
* View the matching complaints dynamically

Example statuses can include:

```text
Pending
In Progress
Resolved
```

##  Testing with Postman

The REST API can be tested using Postman.

Example:

```text
GET http://localhost:3000/api/complaints
```

If there are no complaints yet, the API may return:

```json
[]
```

After adding complaints using the `POST` request, the GET request will return the stored complaints.

##  How the Application Works

```text
User
  ↓
Frontend
  ↓
JavaScript fetch()
  ↓
Express.js REST API
  ↓
Complaint Data
  ↓
API Response
  ↓
Frontend
  ↓
Display Complaints
```

##  Project Objective

The main objective of this project is to create a simple digital complaint management system for PG residents.

Instead of depending on manual complaint registers or directly contacting the PG management for every issue, residents can submit complaints through the application and track their status.

##  What I Learned

Through this project, I learned the basics of:

* Creating a Node.js project
* Using Express.js
* Creating REST APIs
* Handling HTTP methods such as GET, POST, PUT, and DELETE
* Connecting frontend JavaScript with backend APIs
* Using `fetch()` for API requests
* Sending and receiving JSON data
* Testing APIs using Postman
* Organizing a full-stack project
* Using Git and GitHub for version control

##  Future Improvements

Some possible future improvements are:

* User authentication and login
* Admin dashboard
* Database integration using MongoDB/MySQL
* Complaint priority levels
* Email or notification system
* Complaint history
* Image upload for complaints
* User-specific complaint tracking
* Deployment to a cloud platform

##  Author

**Vaibhav Sharma**

GitHub: [VaibhavSharma2007](https://github.com/VaibhavSharma2007)

## License

This project was created for educational and academic purposes.
