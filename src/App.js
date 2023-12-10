import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import { useState } from 'react';
import Header from './Components/Header';

function App() {
  const [totalCharacters, setTotalCharacters] = useState(0);
  return (
    <Router>
    <div className="App">
      <Header/>
      <Routes>
      <Route exact path="/"  element={<Main setTotalCharacters={setTotalCharacters} totalCharacters={totalCharacters}/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
