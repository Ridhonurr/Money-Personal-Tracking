import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SplashScreen } from '@capacitor/splash-screen';
import './App.css'; // Tailwind
import { BrowserRouter } from 'react-router';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Sembunyikan splash screen setelah app siap
SplashScreen.hide();
