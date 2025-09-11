Computer Science Complaints System (CSCS)
A comprehensive web-based complaint management system designed for the Department of Computer Science, University of Port Harcourt. This system streamlines the process of submitting, tracking, and resolving student complaints while providing analytics and insights for administrative decision-making.

📋 Table of Contents
Overview
Features
Technology Stack
System Architecture
Installation Guide
API Documentation
Database Schema
Usage Instructions
Security Features
Testing
Deployment
Contributing
License
Contact Information
🎯 Overview
The Computer Science Complaints System (CSCS) is a modern, responsive web application that digitizes the traditional complaint management process at the University of Port Harcourt's Computer Science Department. The system provides a transparent, efficient, and user-friendly platform for students to submit complaints and track their resolution progress.

Problem Statement
Traditional complaint systems in universities suffer from:

Long response times and lack of transparency
Manual paperwork prone to loss or misplacement
No systematic tracking of complaint patterns
Limited accountability in the resolution process
Difficulty in generating reports for administrative analysis
Solution
CSCS addresses these challenges by providing:

Real-time complaint tracking and status updates
Automated routing and assignment of complaints
Comprehensive analytics and reporting
Email notifications for all stakeholders
Secure document management
Mobile-responsive interface
✨ Features
For Students
Complaint Submission: Easy-to-use forms with category classification and priority settings
Real-time Tracking: Monitor complaint status with detailed timeline
File Attachments: Upload supporting documents and evidence
Dashboard Analytics: Personal complaint statistics and history
Notification System: Email and SMS updates on complaint progress
Profile Management: Update personal information and preferences
For Staff/Administrators
Complaint Management: View, assign, and update complaint status
Analytics Dashboard: Comprehensive reporting and trend analysis
Performance Metrics: Track resolution times and satisfaction rates
Department Insights: Identify recurring issues and improvement areas
Bulk Operations: Handle multiple complaints efficiently
Report Generation: Export data for institutional reporting
System Features
Responsive Design: Optimized for desktop, tablet, and mobile devices
Security: JWT authentication, password hashing, and secure file handling
Scalability: Modular architecture supporting future enhancements
Accessibility: WCAG compliant interface design
Multi-language Support: Ready for internationalization
🛠 Technology Stack
Frontend
React 18: Modern JavaScript library for building user interfaces
Tailwind CSS: Utility-first CSS framework for responsive design
Lucide React: Comprehensive icon library
Axios: HTTP client for API communication
React Router: Client-side routing
Backend
Flask: Python web framework for REST API
SQLAlchemy: Object-Relational Mapping (ORM)
Flask-JWT-Extended: JSON Web Token authentication
Flask-Mail: Email notification system
Flask-CORS: Cross-Origin Resource Sharing support
Bcrypt: Password hashing and security
Database
MySQL: Primary database for data storage
Redis: Session management and caching
Database Views: Optimized queries for analytics
Development Tools
Git: Version control system
Docker: Containerization for consistent environments
pytest: Python testing framework
ESLint: JavaScript code quality
Prettier: Code formatting
🏗 System Architecture
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend API   │────▶│    Database     │
│   (React)       │     │   (Flask)       │     │   (MySQL)       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                        │                        │
        │                        ▼                        │
        │               ┌─────────────────┐               │
        │               │   File Storage  │               │
        │               │   (Local/Cloud) │               │
        │               └─────────────────┘               │
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Notification   │     │   Email Service │     │   Cache Layer   │
│    Service      │     │   (SMTP)        │     │   (Redis)       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
🚀 Installation Guide
Prerequisites
Node.js (v16 or higher)
Python (3.8 or higher)
MySQL (8.0 or higher)
Git
Backend Setup
Clone the Repository
bash
   git clone https://github.com/igboechejohnfavour/cscs-complaint-system.git
   cd cscs-complaint-system
Create Virtual Environment
bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
Install Python Dependencies
bash
   pip install -r requirements.txt
Database Setup
bash
   mysql -u root -p
   CREATE DATABASE cscs_complaints;
   SOURCE database_schema.sql;
   EXIT;
Environment Configuration Create .env file in the root directory:
env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=cscs_complaints

   # Flask Configuration
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your-super-secret-key-change-in-production

   # Email Configuration
   MAIL_SERVER=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USE_TLS=True
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password

   # File Upload Configuration
   UPLOAD_FOLDER=uploads
   MAX_CONTENT_LENGTH=16777216

   # JWT Configuration
   JWT_SECRET_KEY=your-jwt-secret-key
   JWT_ACCESS_TOKEN_EXPIRES=86400
Run Flask Application
bash
   python app.py
Frontend Setup
Navigate to Frontend Directory
bash
   mkdir frontend && cd frontend
Initialize React Application
bash
   npx create-react-app . --template typescript
Install Dependencies
bash
   npm install axios lucide-react tailwindcss @types/node
Configure Tailwind CSS
bash
   npx tailwindcss init -p
Update tailwind.config.js:

javascript
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [],
   }
Add to src/index.css:

css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
Replace App.tsx with the provided React component
Create API Service Create src/services/api.ts:
typescript
   import axios from 'axios';

   const API_BASE_URL = 'http://localhost:5000/api';

   const api = axios.create({
     baseURL: API_BASE_URL,
     headers: {
       'Content-Type': 'application/json',
     },
   });

   // Add authentication token to requests
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });

   export default api;
Start Development Server
bash
   npm start
📚 API Documentation
Authentication Endpoints
Register Student
http
POST /api/register
Content-Type: application/json

{
  "matric_no": "U2020/5570125",
  "email": "student@student.uniport.edu.ng",
  "password": "securepassword",
  "first_name": "John",
  "last_name": "Doe",
  "department": "Computer Science",
  "level": "400 Level",
  "phone": "08012345678"
}
Login
http
POST /api/login
Content-Type: application/json

{
  "email": "student@student.uniport.edu.ng",
  "password": "securepassword",
  "user_type": "student"
}
Complaint Management Endpoints
Get All Complaints
http
GET /api/complaints?status=Open&category=Academic&page=1&per_page=10
Authorization: Bearer <token>
Create New Complaint
http
POST /api/complaints
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Laboratory Equipment Malfunction",
  "description": "The oscilloscopes in Lab 3 are not working properly",
  "category": "Academic",
  "priority": "High",
  "location": "Computer Laboratory 3"
}
Get Complaint Details
http
GET /api/complaints/1
Authorization: Bearer <token>
Update Complaint Status (Staff Only)
http
POST /api/complaints/1/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "In Progress",
  "message": "Technician has been assigned to investigate the issue",
  "resolution": "Equipment replacement scheduled for next week"
}
Analytics Endpoints
Dashboard Statistics
http
GET /api/dashboard/stats
Authorization: Bearer <token>
Get Available Categories
http
GET /api/categories
File Upload Endpoint
Upload Attachment
http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "file": <binary_data>,
  "complaint_id": "1"
}
🗄 Database Schema
Core Tables
users
id (Primary Key)
matric_no (Unique, Format: U2020/5570125)
email (Unique)
password_hash
first_name, last_name
department, level
phone, role
is_active, created_at, last_login
complaints
id (Primary Key)
complaint_id (Unique, Format: CMP001)
title, description
category, priority, status
student_id (Foreign Key → users.id)
assigned_to (Foreign Key → staff.id)
created_at, updated_at, resolved_at
estimated_resolution, resolution
satisfaction_rating, feedback
complaint_updates
id (Primary Key)
complaint_id (Foreign Key → complaints.id)
message, updated_by
created_at
complaint_attachments
id (Primary Key)
complaint_id (Foreign Key → complaints.id)
filename, original_filename
file_path, file_size, mime_type
created_at
Database Views
complaint_summary
Provides comprehensive complaint information with joins:

sql
CREATE VIEW complaint_summary AS
SELECT 
    c.id, c.complaint_id, c.title, c.category, c.priority, c.status,
    c.created_at, c.updated_at, c.resolved_at,
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    u.department as student_department, u.matric_no,
    CONCAT(s.first_name, ' ', s.last_name) as assigned_staff_name,
    s.department as staff_department,
    DATEDIFF(COALESCE(c.resolved_at, NOW()), c.created_at) as days_open
FROM complaints c
LEFT JOIN users u ON c.student_id = u.id
LEFT JOIN staff s ON c.assigned_to = s.id;
📖 Usage Instructions
For Students
Registration
Visit the application homepage
Click "Register" and fill in your UNIPORT details
Use format U2020/XXXXXXX for matric number
Verify email address
Submitting a Complaint
Navigate to "Submit Complaint"
Fill in all required fields:
Title: Brief, descriptive summary
Category: Select appropriate type
Priority: Based on urgency
Description: Detailed explanation
Attach supporting documents if available
Click "Submit Complaint"
Tracking Complaints
View all complaints on "My Complaints" page
Use filters to find specific complaints
Click "View Details" for complete information
Monitor status updates and responses
Profile Management
Update contact information
Set notification preferences
View account statistics
Change password
For Staff/Administrators
Complaint Assignment
Review new complaints in dashboard
Assign to appropriate department/person
Set estimated resolution time
Status Updates
Regularly update complaint status
Add progress notes for transparency
Upload additional documentation
Resolution Process
Document resolution steps
Mark complaints as resolved
Request student feedback
Analytics Review
Monitor department performance
Identify trending issues
Generate reports for management
🔐 Security Features
Authentication & Authorization
JWT Token-based Authentication: Secure, stateless authentication
Password Hashing: Bcrypt with salt for password security
Role-based Access Control: Different permissions for students and staff
Token Expiration: Automatic logout for security
Data Protection
Input Validation: Server-side validation for all inputs
SQL Injection Prevention: Parameterized queries through ORM
XSS Protection: Content Security Policy headers
File Upload Security: Type validation and size limits
HTTPS Enforcement: SSL/TLS encryption in production
Privacy & Compliance
Data Anonymization: Option for anonymous complaints
GDPR Compliance: Data export and deletion capabilities
Audit Logging: Track all system activities
Session Management: Secure session handling
🧪 Testing
Backend Testing
bash
# Install testing dependencies
pip install pytest pytest-flask pytest-cov

# Run tests
pytest tests/ -v --cov=app

# Generate coverage report
pytest --cov=app --cov-report=html
Frontend Testing
bash
# Run React tests
npm test

# Run with coverage
npm test -- --coverage --watchAll=false
Test Structure
tests/
├── unit/
│   ├── test_models.py
│   ├── test_auth.py
│   └── test_complaints.py
├── integration/
│   ├── test_api_endpoints.py
│   └── test_workflows.py
└── fixtures/
    ├── sample_data.py
    └── test_files/
🚀 Deployment
Production Environment Setup
Server Requirements
Ubuntu 20.04 LTS or CentOS 8
4GB RAM minimum (8GB recommended)
50GB storage
SSL certificate
Database Configuration
bash
   # Install MySQL 8.0
   sudo apt update
   sudo apt install mysql-server

   # Secure installation
   sudo mysql_secure_installation

   # Create production database
   mysql -u root -p
   CREATE DATABASE cscs_complaints_prod;
   CREATE USER 'cscs_user'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON cscs_complaints_prod.* TO 'cscs_user'@'localhost';
   FLUSH PRIVILEGES;
Application Deployment
bash
   # Install dependencies
   sudo apt install python3-pip nginx

   # Clone repository
   git clone https://github.com/igboechejohnfavour/cscs-complaint-system.git
   cd cscs-complaint-system

   # Install Python dependencies
   pip3 install -r requirements.txt

   # Install Gunicorn
   pip3 install gunicorn

   # Run with Gunicorn
   gunicorn --bind 0.0.0.0:5000 app:app
Nginx Configuration
nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       location /api {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
SSL Configuration
bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx

   # Obtain SSL certificate
   sudo certbot --nginx -d your-domain.com
Docker Deployment
Create Dockerfile
dockerfile
   FROM node:16-alpine AS frontend
   WORKDIR /app/frontend
   COPY frontend/package*.json ./
   RUN npm install
   COPY frontend/ .
   RUN npm run build

   FROM python:3.9-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   COPY --from=frontend /app/frontend/build ./static
   EXPOSE 5000
   CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
Docker Compose
yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "5000:5000"
       environment:
         - DB_HOST=db
         - DB_USER=cscs_user
         - DB_PASSWORD=secure_password
       depends_on:
         - db
     
     db:
       image: mysql:8.0
       environment:
         - MYSQL_ROOT_PASSWORD=root_password
         - MYSQL_DATABASE=cscs_complaints
         - MYSQL_USER=cscs_user
         - MYSQL_PASSWORD=secure_password
       volumes:
         - mysql_data:/var/lib/mysql
   
   volumes:
     mysql_data:
🤝 Contributing
Development Workflow
Fork the Repository
bash
   git fork https://github.com/igboechejohnfavour/cscs-complaint-system.git
Create Feature Branch
bash
   git checkout -b feature/new-functionality
Make Changes and Test
bash
   # Make your changes
   # Run tests
   pytest tests/
   npm test
Commit and Push
bash
   git add .
   git commit -m "Add new functionality"
   git push origin feature/new-functionality
Create Pull Request
Describe changes made
Include screenshots if UI changes
Reference any related issues
Code Standards
Python: Follow PEP 8 style guide
JavaScript/TypeScript: Use ESLint and Prettier
Commit Messages: Use conventional commit format
Documentation: Update README for new features
Reporting Issues
When reporting bugs, include:

Steps to reproduce
Expected vs actual behavior
Screenshots (if applicable)
Browser/environment information
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

MIT License Summary
✅ Commercial use
✅ Modification
✅ Distribution
✅ Private use
❌ Liability
❌ Warranty
📞 Contact Information
Developer
Igboeche John Favour Ikenna

Email: igboechejohn@gmail.com
Phone: +234 816 984 9839
GitHub: @igboechejohnfavour
LinkedIn: John Favour Igboeche
University Contact
Department of Computer Science

University: University of Port Harcourt
Location: Port Harcourt, Rivers State, Nigeria
Website: www.uniport.edu.ng
Support
For technical support or questions about the system:

Email: support@cscs.uniport.edu.ng
Documentation: Project Wiki
Issues: GitHub Issues
Final Year Project - Computer Science Department University of Port Harcourt, 2024

This system was developed as part of a final year project to demonstrate proficiency in full-stack web development, database design, and software engineering principles.

