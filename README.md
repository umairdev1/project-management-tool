# Project Management Tool

A full-stack project management application built with **NestJS** (backend) and **Angular** (frontend) in a monorepo structure.

## 🏗️ Project Structure

```
project-management-tool/
├── frontend/          # Angular 18 frontend application
├── backend/           # NestJS backend API
├── package.json       # Root monorepo configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install all dependencies (root + both apps)
npm run install:all

# Or install step by step
npm install
npm run install:workspaces
```

### Development

```bash
# Run both frontend and backend in development mode
npm run dev

# Run only backend (NestJS)
npm run dev:backend

# Run only frontend (Angular)
npm run dev:frontend
```

### Building

```bash
# Build both applications
npm run build

# Build specific application
npm run build:backend
npm run build:frontend
```

### Testing

```bash
# Run tests for both applications
npm run test

# Run tests for specific application
npm run test:backend
npm run test:frontend
```

### Linting & Formatting

```bash
# Lint both applications
npm run lint

# Format code in both applications
npm run format
```

## 📁 Application Details

### Backend (NestJS)

- **Port**: 3000 (default)
- **Framework**: NestJS 11
- **Database**: (To be configured)
- **Features**: REST API, Authentication, Project Management

### Frontend (Angular)

- **Port**: 4200 (default)
- **Framework**: Angular 18
- **Features**: Modern UI, Responsive Design, Project Dashboard

## 🚀 Deployment

### Frontend Deployment

The frontend can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: `npm run build:frontend` then deploy `frontend/dist` folder

### Backend Deployment

The backend can be deployed to any Node.js hosting service:

- **Heroku**: `git push heroku main`
- **Railway**: Connect your GitHub repo
- **DigitalOcean App Platform**: Deploy from GitHub

## 🛠️ Available Scripts

| Script                 | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start both frontend and backend in development mode |
| `npm run dev:backend`  | Start only backend in development mode              |
| `npm run dev:frontend` | Start only frontend in development mode             |
| `npm run build`        | Build both applications                             |
| `npm run test`         | Run tests for both applications                     |
| `npm run lint`         | Lint code in both applications                      |
| `npm run format`       | Format code in both applications                    |
| `npm run clean`        | Clean all build artifacts and node_modules          |
| `npm run install:all`  | Install dependencies for root and all workspaces    |

## 🔧 Development Workflow

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/project-management-tool.git
   cd project-management-tool
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

3. **Start development servers**

   ```bash
   npm run dev
   ```

4. **Access applications**
   - Frontend: http://localhost:4200
   - Backend: http://localhost:1003

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test your changes: `npm run test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

If you have any questions or need help, please open an issue on GitHub.
