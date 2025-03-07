import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./styles/global.css"; 
import { StoreProvider } from './context/StoreContext.tsx';
import { SKUProvider } from './context/SKUContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
    <SKUProvider>
      <App />
    </SKUProvider>
    </StoreProvider>
  </StrictMode>,
)
