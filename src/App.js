import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import LoadingSpinner from "./LoadingSpinner";
import './App.css';

function App() {
  const wordList = ["Class", "Clans", "Clank", "Blank", "Blink", "Brink"]
  const [beginWord, setBeginWord] = useState("Glass");
  const [endWord, setEndWord] = useState("Brick");
  const [isValid, setValid] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const solveWordLadder = (e) => {
    console.log("solveWordLadder::::", showModal, isLoading)
    e.preventDefault();
    return showModal ? alert('Solution not found') : setIsLoading(true);
  };
  
  const handleChange = (fieldName, value) => { 
    if (fieldName === "beginWord") {
      setBeginWord(value.toLowerCase());
    }
    else if(fieldName === "endWord") {
      setEndWord(value.toLowerCase());
    }
  }

  const validate = () => {
    if(beginWord.trim() !== "" || endWord.trim() !== "") {
      return setValid(false);
    } else if(beginWord !== endWord) {
      return setValid(false);
    } else if(beginWord.length === endWord.length) { 
      return setValid(false);
    }

    return setValid(true);
    // return ((beginWord.trim() !== "" || endWord.trim() !== "") || (beginWord !== endWord || beginWord.length !== endWord.length));
  };
  
  useEffect(() => {
    const isValidated = validate();
    setValid(isValidated);
  }, [beginWord, endWord]);

  // console.log("isValid::::outside", isValid)
  return (
    <div className="App">
      <header className="App-header">Word Ladder</header>
      <form onSubmit={solveWordLadder}>
        <div className="Content">
          <input type="text" pattern="[a-zA-Z]*" name="beginWord" value={beginWord} onChange={(e)=>{handleChange("beginWord",e.target.value)}} required />
          <div className="Word-ladder">
            <p>Class</p>
            <p>Clans</p>
            <p>Clank</p>
            <p>Blank</p>
            <p>Blink</p>
            <p>Brink</p>
          </div>
          <input type="text" pattern="[a-zA-Z]*" name="endWord"  value={endWord} onChange={(e)=>{handleChange("endWord",e.target.value)}} required /> 
        </div>
        {isLoading ? <LoadingSpinner /> : ''}
        <button type="submit" className={isValid ? 'Disabled' : ''} disabled={isValid}>Solve</button>
      </form>
    </div>
  );
}

export default App;
