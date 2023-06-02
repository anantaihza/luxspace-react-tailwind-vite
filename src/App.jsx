import './assets/css/App.css';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' Component={HomePage} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
