import React from 'react';
import './App.css';
import NavBar from './components/layout/Navbar.component';
import Footer from './components/layout/Footer.component';
import Landing from './components/layout/Landing.component';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
