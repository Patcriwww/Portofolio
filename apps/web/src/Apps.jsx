import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import { ThemeProvider } from '@/hooks/use-theme.jsx';
import { WorkspaceProvider } from '@/hooks/use-workspace.jsx';

function App() {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </WorkspaceProvider>
    </ThemeProvider>
  );
}

export default App;