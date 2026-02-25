import { StrictMode } from 'react';

import { ThemeProvider } from 'next-themes';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { Toaster } from '@/components/ui/sonner';

import App from './App.tsx';
import './styles/index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light">
      <BrowserRouter>
        <App />
        <Toaster position="bottom-center" richColors closeButton />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
