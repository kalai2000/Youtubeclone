#   YouTube Clone - MERN Stack Capstone Project

A full-stack YouTube clone built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project allows users to browse, search, and interact with videos in a familiar YouTube-like interface.

 

## 🚀 Features

### Frontend (React)

*   Home Page with Header, Sidebar, Filter Buttons, and Video Grid
*   User Authentication (Sign Up, Sign In using JWT)
*   Video Player Page
    * Play video
    * Like / Dislike functionality
    * Comment section (Add / Edit / Delete)
*   Channel Page
    * Create / Edit / Delete videos
    * Display videos by channel
*   Search and Filter by category/title
*   Responsive design for mobile, tablet, and desktop

### Backend (Node.js + Express.js)

*   RESTful API for users, channels, videos, comments
*   JWT-based authentication
*   File uploads (videos, thumbnails, userimage) using Multer

 

##  Folder Structure

 
Fullstack-project/
├── client/               # React frontend
└── server/               # Node.js backend
 

 

## ⚙️ Technologies Used

### Frontend:

* React
* React Router DOM
* Axios
* CSS Modules / Custom CSS

### Backend:

* Node.js
* Express.js
* MongoDB (Local or MongoDB Atlas)
* Mongoose
* Multer (File Upload)
* JSON Web Token (JWT)

### Other:

* Git + GitHub for version control
* Redux Toolkit for state management

 

##  Setup Instructions

### 1. Clone the repository

 
git clone https://github.com/kalai2000/Youtubeclone
cd Youtubeclone
 

### 2. Install dependencies

 
# For server
cd server
npm install

# For client
cd client
npm install
 

### 3. Configure Environment Variables

Create a `.env` file inside the `server/` directory with the following:

```env
MONGO=mongodb://localhost:27017/Youtubeclone
JWT_SECRET=your_JWT_super_secret_key_here
```

>  Replace `your_super_secret_key_here` with your own secure string.
> Ensure MongoDB is running locally or update the connection string.

Also, ensure `.env` is added to `.gitignore`:

 
# Inside .gitignore
.env
 

### 4. Run the Application

 
# Start backend
cd server
node server.js

# Start frontend
cd client
npm run dev
 

The app will run on:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:8800`

 
##   Documentation

* Code is organized using feature-based folders
* API endpoints are defined in Express route files
* Redux slices manage state for user and video modules
* All static files (videos/images) are served from the `uploads/` folder

 

##   Testing

Test the following:

* Register/Login functionality
* JWT token management
* Uploading and displaying videos
* Like/Dislike toggle
* Comment CRUD operations
* Responsive layout on different devices

 
##   License

This project is for academic and learning purposes.


### GitHub link


