import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import { useEffect, useState } from 'react';
import { TotalCharactersProvider } from './Context/TotalCharactersContext';

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
    <TotalCharactersProvider>
      <Routes>
      <Route exact path="/"  element={<Main isMobileView={isMobileView} setTotalCharacters={setTotalCharacters} totalCharacters={totalCharacters}/>}/>
      </Routes>
      </TotalCharactersProvider>
    </div>
    </Router>
  );
}

export default App;
