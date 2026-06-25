import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd' 
import es_ES from 'antd/locale/es_ES' 
import App from './App.tsx'
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={es_ES}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)