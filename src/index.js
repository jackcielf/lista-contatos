import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // BootStrap
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App';
import './App.css';

const root = document.getElementById('root');
createRoot(root).render(<App />);