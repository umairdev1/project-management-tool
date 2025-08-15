# Project Management Tool - Backend

A robust NestJS backend for the Enterprise Project Management Tool with real-time collaboration features.

## 🏗️ Architecture Overview

The backend follows a modular architecture with clear separation of concerns:

```
src/
├── auth/           # Authentication & Authorization
├── users/          # User Management
├── projects/       # Project Management
├── tasks/          # Task Management
├── chat/           # Real-time Communication
├── notifications/  # Notification System
├── reports/        # Reporting & Analytics
├── files/          # File Management
├── activity/       # Activity Logging & Audit
├── shared/         # Common Utilities & Guards
├── database/       # Database Configuration
└── websocket/      # Real-time Communication
```

## 🚀 Features

### Core Modules
- **User Management**: Registration, authentication, role-based access control
- **Project Management**: Create, edit, delete projects with team collaboration
- **Task Management**: Comprehensive task system with subtasks and file attachments
- **Real-time Chat**: Project-specific chat rooms and direct messaging
- **Notifications**: In-app, email, and push notifications
- **File Management**: Secure file uploads with thumbnails and metadata
- **Activity Logging**: Complete audit trail for compliance
- **Reports**: Progress tracking, Gantt charts, and analytics

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Admin, Project Manager, Team Member, Viewer roles
- **Real-time Updates**: WebSocket integration for live collaboration
- **File Uploads**: Secure file handling with validation
- **Database Migrations**: TypeORM migrations for schema management
- **API Documentation**: Swagger/OpenAPI documentation
- **Rate Limiting**: Protection against abuse
- **Validation**: Input validation with class-validator

## 🛠️ Tech Stack

- **Framework**: NestJS 10+
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT + Passport
- **Real-time**: Socket.io
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest + Supertest
- **File Handling**: Multer + Sharp

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis (optional, for caching)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the environment files and configure:
```bash
cp env.local .env
```

Update the `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=project_management
JWT_SECRET=your_jwt_secret
```

### 3. Database Setup
```bash
# Create database
createdb project_management

# Run migrations (if any)
npm run migration:run
```

### 4. Start Development Server
```bash
npm run start:dev
```

The API will be available at `http://localhost:1003`

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:1003/api`
- **API JSON**: `http://localhost:1003/api-json`

## 🗄️ Database Schema

### Core Entities

#### Users
- Authentication & profile information
- Role-based permissions
- Project memberships

#### Projects
- Project details & metadata
- Team member management
- Status tracking & progress

#### Tasks
- Task management with subtasks
- Assignment & priority
- File attachments & comments

#### Chat System
- Project-specific chat rooms
- Direct messaging
- File sharing & mentions

#### Notifications
- Multi-channel delivery
- Priority-based routing
- Read receipts & actions

## 🔐 Authentication & Authorization

### JWT Authentication
- Access tokens with configurable expiration
- Refresh token support
- Secure password hashing with bcrypt

### Role-based Access Control
- **Admin**: Full system access
- **Project Manager**: Project administration
- **Team Member**: Task management
- **Viewer**: Read-only access

### Guards & Decorators
- `@Public()` - Skip authentication
- `@Roles()` - Role-based access
- `@CurrentUser()` - Get authenticated user

## 🌐 Real-time Features

### WebSocket Events
- Task status updates
- Chat messages
- Project changes
- User presence

### Room Management
- Project-specific rooms
- User-specific channels
- Broadcast capabilities

## 📁 File Management

### Supported Types
- Documents (PDF, DOC, etc.)
- Images (with thumbnails)
- Videos & Audio
- Archives

### Security Features
- File type validation
- Size limits
- Access control
- Virus scanning (optional)

## 📊 Reporting & Analytics

### Available Reports
- Project progress tracking
- User workload overview
- Time tracking analytics
- Custom report builder

### Export Formats
- PDF reports
- Excel spreadsheets
- CSV data export

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

### Test Structure
- Unit tests for services
- Integration tests for modules
- E2E tests for API endpoints

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Environment Variables
- Set `NODE_ENV=production`
- Configure production database
- Set secure JWT secrets
- Enable SSL/TLS

### Docker Support
```bash
docker-compose up -d
```

## 📝 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - User logout

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `GET /users` - List users (admin only)

### Projects
- `GET /projects` - List projects
- `POST /projects` - Create project
- `GET /projects/:id` - Get project details
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Tasks
- `GET /projects/:id/tasks` - List project tasks
- `POST /projects/:id/tasks` - Create task
- `GET /tasks/:id` - Get task details
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Chat
- `GET /chat/rooms` - List chat rooms
- `POST /chat/rooms` - Create chat room
- `GET /chat/rooms/:id/messages` - Get messages
- `POST /chat/rooms/:id/messages` - Send message

## 🔧 Configuration

### Database
- Connection pooling
- Query optimization
- Migration management

### Security
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention

### Performance
- Response caching
- Database indexing
- Query optimization

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Submit pull requests

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the code examples
