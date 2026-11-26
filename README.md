# NexusFlow
NexusFlow is a Visual IoT Telemetry and Rule Engine built using the MERN stack.
# NexusFlow – Visual IoT Telemetry & Rule Engine

## Project Overview
NexusFlow is an IoT-based platform that allows users to create visual workflows for monitoring sensor data and generating alerts based on predefined conditions.

The system processes real-time sensor data and helps users monitor IoT devices through a visual dashboard.

## Key Features
- Visual workflow creation using React Flow.
- Backend REST API development.
- Workflow creation, retrieval, updating, and deletion.
- Workflow activation and deactivation.
- MongoDB database integration.
- Real-time telemetry processing and alert generation (planned).

## Technologies Used
- **Frontend:** React.js, React Flow
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Real-Time Communication:** Socket.IO
- **Rule Engine:** RxJS
- **API Testing:** Postman

## Backend Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend folder:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure the `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/nexusflow
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/workflows` | Create workflow |
| GET | `/api/workflows` | Get all workflows |
| GET | `/api/workflows/:id` | Get single workflow |
| PUT | `/api/workflows/:id` | Update workflow |
| DELETE | `/api/workflows/:id` | Delete workflow |
| POST | `/api/workflows/:id/activate` | Activate workflow |
| POST | `/api/workflows/:id/deactivate` | Deactivate workflow |

## Backend Development – Week 1
- Configured Node.js and Express.js environment.
- Established MongoDB connection.
- Created the Workflow database model.
- Developed workflow CRUD REST APIs.
- Implemented workflow activation and deactivation.
- Organized code using routes, controllers, and services.

## Future Enhancements
- Workflow validation and compilation.
- Dynamic rule execution using RxJS.
- Real-time sensor data processing.
- Automated alert generation.
- Socket.IO integration.
- Webhook integration.
- Performance testing.

## Team Contributions
This project is developed collaboratively by a four-member team. Each member is responsible for frontend development, workflow builder, backend and rule engine, or database and real-time functionality.

## Project Status
Backend foundation and Week 1 API development are in progress. Further features will be integrated in upcoming development phases.
