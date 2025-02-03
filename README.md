# EHR Integration System - Backend

## 📌 Overview

This is the backend of the EHR (Electronic Health Records) Integration System. It provides GraphQL API endpoints for managing EHR mappings, user authentication, and data transformation between different EHR systems.

## 🏗️ Technologies Used

- **NestJS** - Backend framework
- **TypeORM** - ORM for database interaction
- **PostgreSQL** - Database
- **GraphQL (Apollo Server)** - API handling
- **JWT Authentication** - Secure API access

## 📂 Project Structure

```
├── src/
│   ├── application/
│   ├── core/
│   ├── infrastructure/
│   ├── presentation/
│   ├── main.ts
├── .env
├── docker-compose.yml
├── package.json
├── README.md
```

## 🛠️ Environment Variables

The project uses an `.env` file to configure database and authentication settings.

```
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=ehr_system

# Apollo GraphQL Configuration
GRAPHQL_PLAYGROUND=true
GRAPHQL_DEBUG=true
GRAPHQL_INTROSPECTION=true

# JWT Authentication
JWT_SECRET=mysecretkey
JWT_EXPIRES_IN=3600s

# Default Users
PATIENT_EMAIL=patient@test.com
PATIENT_PASSWORD=password123

DOCTOR_EMAIL=doctor@test.com
DOCTOR_PASSWORD=password123

ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=admin123
```

## 📦 Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/ehr-integration-backend.git
   cd ehr-integration-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure the `.env` file with your database credentials.

4. Run the database using Docker:

   ```sh
   docker-compose up -d
   ```

5. Run the database migrations:

   ```sh
   npm run migration:run
   ```

6. Seed default users and mappings:

   ```sh
   npm run seed:run
   ```

7. Start the server:

   ```sh
   npm run start:dev
   ```

## 🚀 Features

### ✅ User Authentication (JWT)

- Users can log in with email and password.
- Token-based authentication.

### ✅ EHR Mappings

- Stores and retrieves field mappings for different EHR systems.
- Supports multiple EHR providers such as Athena and Allscripts.

### ✅ GraphQL API

- Query and mutation support for fetching and updating mappings.
- Secure endpoints with JWT authentication.

## 📌 Database Models

### **User Entity**

```typescript
export class User {
  id: number;
  email: string;
  password: string;
  role: 'ROLE_ADMIN' | 'ROLE_DOCTOR' | 'ROLE_PATIENT';
}
```

### **EHR Mapping Entity**

```typescript
export class EHRMapping {
  ehrSystem: string;
  sourceField: string;
  targetField: string;
}
```

## 📡 GraphQL API Endpoints

### 🔹 Query: Get EHR Mappings

```graphql
query GetMappings($ehrSystem: String!) {
  getMappings(ehrSystem: $ehrSystem) {
    sourceField
    targetField
  }
}
```

### 🔹 Mutation: Add or Update EHR Mappings

```graphql
mutation AddOrUpdateEHRMappings($ehrSystem: String!, $mappings: String!) {
  addOrUpdateEHRMappings(ehrSystem: $ehrSystem, mappings: $mappings)
}
```

### 🔹 Query: Get All EHR Systems

```graphql
query GetEHRSystems {
  getEHRSystems {
    ehrSystem
  }
}
```

## 🛡️ Authentication & Security

- Uses **JWT** for authentication.
- Protected GraphQL endpoints with `@UseGuards(JwtAuthGuard)`.
- Passwords are securely hashed with **bcrypt**.

## 🔹 Running the Database with Docker Compose
To set up the PostgreSQL database using Docker, make sure you have **Docker** installed and run the following command:

```sh
docker-compose up -d
```

This will start the PostgreSQL database in a Docker container. Ensure that your `.env` file is properly configured before running this command.

## 🚀 API Scalability Plan
To ensure the system can handle increasing loads as more users are added, the following strategies will be implemented:

### **1️⃣ Efficient Data Structures & Query Optimization**
- **Indexes in PostgreSQL** for frequent queries (e.g., indexes on `email` for users and `ehrSystem` for mappings).
- **Denormalization & Materialized Views** for frequently accessed data.

### **2️⃣ Load Balancing & API Rate Limiting**
- **GraphQL Caching** using **Redis** to store query responses and reduce database load.
- **Load Balancing** with a cloud-based solution (AWS ALB, GCP Load Balancer) for high availability.

### **3️⃣ Asynchronous Processing & Microservices**
- **RabbitMQ / Kafka** for event-driven processing of heavy tasks.

### **4️⃣ Horizontal Scaling**
- **Auto-scaling via Kubernetes (K8s)** to dynamically adjust resources based on traffic.

## 🔹 Frontend Installation
1. Navigate to the frontend directory:
   ```sh
   cd help-ehr
   ```
2. Create an `.env.local` file with the following content:
   ```sh
   PORT=3001
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the frontend application:
   ```sh
   npm run dev
   ```