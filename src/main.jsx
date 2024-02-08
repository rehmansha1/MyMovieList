import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import './index.css';
import MovieDetails from './Pages/MovieDetails';

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/detes/:id" element={<MovieDetails />} />
    </Routes>
  </Router>
);

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(router);
