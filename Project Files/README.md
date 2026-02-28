 
✈️ FlightFinder: MERN Stack Flight Booking System
This project is a full-stack flight reservation system developed for the APSCHE SmartInternz Externship 2026. It provides a seamless interface for users to discover flights and for administrators to manage airline schedules.

🚀 How to Run the Project Locally
Follow these steps to get the application running on your local machine.

1. Prerequisites
Ensure you have the following installed:

Node.js (v18 or higher)

npm (Node Package Manager)

Git

A MongoDB Atlas account (Cloud) or a local MongoDB installation

2. Backend Setup (Server)
Open your terminal and navigate to the server folder:

Bash
cd "Project Development Phase/server"
Install dependencies:

Bash
npm install
Create a .env file in the server folder and add your credentials:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
Start the server:

Bash
npm start
The server should now be active on http://localhost:5000.

3. Frontend Setup (Client)
Open a new terminal tab and navigate to the client folder:

Bash
cd "Project Development Phase/client"
Install dependencies:

Bash
npm install
Start the React development server:

Bash
npm run dev
The app should now be accessible at http://localhost:5173 (Vite default).

🛠️ How to Access Features
User Features: Register a new account to search for flights and view your "My Bookings" dashboard.

Admin Dashboard: Access the administrative panel to Add, Update, or Delete flight schedules and monitor all bookings.

Database Management: All data is securely stored in MongoDB Atlas. Ensure your IP address is whitelisted in the MongoDB Network Access settings for successful connection.

⚠️ Troubleshooting & Known Issues
1. "Site Can't Be Reached" (Network/Firewall)
Issue: You encounter an ERR_CONNECTION_REFUSED or a blank page when trying to push to GitHub or connect to the database.

Solution: This is typically caused by ISP firewalls or restricted college Wi-Fi. Switch to a mobile hotspot or a different network to bypass local restrictions.

2. Git Identity Errors
Issue: Receiving Author identity unknown during a commit.

Solution: Configure your Git identity using the following commands:

Bash
git config --global user.email "manikantapadala34@gmail.com"
git config --global user.name "Manikanta Padala"
3. MongoDB Connection Timeout
Issue: The server logs a "Mongoose Server Selection Error."

Solution: Visit MongoDB Atlas > Network Access and ensure you have added 0.0.0.0/0 to allow temporary access from any IP address for evaluation purposes.

4. Port Already in Use
Issue: Error message: listen EADDRINUSE: address already in use :::5000.

Solution: A previous Node process is still running. Use Ctrl + C in your terminal to terminate it, or end the process via Task Manager.

👨‍💻 Project Owner
Manikanta Padala Bachelor of Technology in Electronics and Communication Engineering (ECE) Aditya Institute of Technology and Management

## Database Configuration & Setup
This application is fully configured to connect to a live MongoDB Atlas cloud database. However, because some local ISP networks and campus firewalls strictly block the default MongoDB port (27017), the environment is currently set to use a local fallback database to ensure seamless evaluation.

### How to Run Locally:
1. Ensure you have **MongoDB Compass** or the MongoDB local server installed and running on your machine.
2. Open the `server` folder and check the `.env` file. Ensure the connection string is set to local:
   `MONGO_URI=mongodb://127.0.0.1:27017/flight_booking`
3. Install dependencies and start the backend server:
   ```bash
   cd server
   npm install
   npm start
