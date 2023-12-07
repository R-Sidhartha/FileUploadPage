import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import { useEffect, useState } from 'react';

function App() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [totalCharacters, setTotalCharacters] = useState(0);

  const checkIsMobileView = () => {
    const breakpoint = 768;

    if (window.innerWidth < breakpoint) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  useEffect(() => {
    checkIsMobileView();
    window.addEventListener("resize", checkIsMobileView);
    return () => {
      window.removeEventListener("resize", checkIsMobileView);
    };
  }, []);
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route exact path="/"  element={<Main isMobileView={isMobileView} setTotalCharacters={setTotalCharacters} totalCharacters={totalCharacters}/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
