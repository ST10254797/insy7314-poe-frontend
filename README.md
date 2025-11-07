# INSY7314 POE Frontend

## Project Overview
This is the frontend application for the INSY7314 Portfolio of Evidence (POE) project. The application provides a user interface for [describe your application's purpose].

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization
- Responsive design for mobile and desktop
- [Add your specific features here]
- Real-time data updates
- Intuitive user interface

## Technologies Used
- **Frontend Framework**: React.js / Vue.js / Angular (specify which one)
- **State Management**: Redux / Vuex / Context API (if applicable)
- **Styling**: CSS3 / SCSS / Tailwind CSS / Material-UI
- **HTTP Client**: Axios / Fetch API
- **Build Tool**: Webpack / Vite / Create React App
- **Package Manager**: npm / yarn

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher) or **yarn** (v1.22.x or higher)
- **Git**

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ST10254797/insy7314-poe-frontend.git
cd insy7314-poe-frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
# Add other environment variables as needed
```

**Note**: Never commit your `.env` file to version control. Add it to `.gitignore`.

## Running the Application

### Development Mode
```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:3000` (or your configured port).

### Production Build
```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build/` directory.

### Preview Production Build
```bash
npm run serve
# or
yarn serve
```

## Project Structure
```
insy7314-poe-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   ├── App.js           # Main application component
│   └── index.js         # Entry point
├── .env.example         # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

## API Integration

### Base URL
The application connects to the backend API at the URL specified in `REACT_APP_API_URL`.

### Authentication
Authentication is handled via JWT tokens stored in localStorage/sessionStorage.

### Example API Call
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Testing

### Run Tests
```bash
npm test
# or
yarn test
```

### Run Tests with Coverage
```bash
npm run test:coverage
# or
yarn test:coverage
```

## Deployment

### Deploy to Render
1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" and select "Static Site"
4. Connect your GitHub repository
5. Configure the following:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
6. Add environment variables in the Render dashboard
7. Click "Create Static Site"

Your application will be automatically deployed and you'll receive a live URL.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

## Author
**Student Number**: ST10254797

## License
This project is licensed for educational purposes as part of the INSY7314 course.

---

**Course**: INSY7314  
**Institution**: IIE Varsity College  
**Year**: 2025
