# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application named `goyoai-n8n-front` built with Create React App (CRA). The project uses React 19.2.0 and is configured with standard CRA tooling including Webpack, Babel, ESLint, and Jest.

## Development Commands

### Starting Development Server
```bash
npm start
```
Runs the development server on http://localhost:3000 with hot reloading enabled.

### Building for Production
```bash
npm run build
```
Creates an optimized production build in the `build/` directory.

### Running Tests
```bash
npm test
```
Launches Jest test runner in interactive watch mode.

**Run a single test file:**
```bash
npm test -- App.test.js
```

**Run tests without watch mode:**
```bash
npm test -- --watchAll=false
```

## Project Structure

```
goyoai-n8n-front/
├── public/           # Static assets (index.html, favicon, etc.)
├── src/              # Application source code
│   ├── App.js        # Main application component
│   ├── App.css       # App component styles
│   ├── App.test.js   # App component tests
│   ├── index.js      # React application entry point
│   ├── index.css     # Global styles
│   ├── setupTests.js # Jest test configuration
│   └── reportWebVitals.js  # Performance metrics
├── package.json      # Dependencies and scripts
└── README.md         # CRA documentation
```

## Architecture Notes

- **Entry Point**: `src/index.js` renders the root `<App />` component into the DOM element with id "root"
- **React Version**: Uses React 19.2.0 with React.StrictMode enabled
- **Rendering**: Uses `ReactDOM.createRoot()` (React 18+ concurrent rendering API)
- **Testing**: Configured with React Testing Library and Jest
- **Build Tool**: Create React App (react-scripts 5.0.1) - webpack, Babel, and ESLint are abstracted

## Working Directory Note

The actual project files are located in the `goyoai-n8n-front/` subdirectory. When running commands, ensure you're in the correct directory:

```bash
cd goyoai-n8n-front
npm start
```

## Browser Support

**Production:**
- \>0.2% market share
- Not dead browsers
- Not Opera Mini

**Development:**
- Last Chrome version
- Last Firefox version
- Last Safari version
