import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App!</h1>
        <img src="src/assets/chip.png" alt="chip" />
        <p>
          Name: [John Gabriel Abonita]
          <br />
          Email: [abonitajs@students.national-u.edu.ph]
          <br />
          Course: [BSIT-MWA]
          <br />
          <a
            href="https://github.com/johngabriel0311/abonita-webprog"
            target="_"
          >
            Github Repository
          </a>
        </p>
      </header>
    </div>
  );
}
export default App;

// cd abonita-client
// npm run dev
