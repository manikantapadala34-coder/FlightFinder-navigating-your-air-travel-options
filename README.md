# Flight Booking Application (MERN Stack)

This is a full-stack flight booking application built using MongoDB, Express.js, React, and Node.js. 

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