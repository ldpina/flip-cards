import React, { useState } from 'react';
import './App.css';

const App = () => {
  const cards = [
    { question: "Translate 'What do you study in College?' to Spanish", answer: "Que estudias en la universidad?" },
    { question: "Translate 'hello' to Spanish.", answer: "Hola" },
    { question: "Translate 'How are you?' to Spanish.", answer: "Como estas" },
    { question: "Translate 'Where is the library?' to Spanish.", answer: "Donde esta la biblioteca?" },
    { question: "Translate 'Want to work together on this asignment?' to Spanish.", answer: "Quieres trabajar juntos en esta tarea?" },
    { question: "Translate 'Voy al baño' to English.", answer: "I'm Going to the restroom" },
    { question: "Translate 'Adios!' to English.", answer: "Goodbye!" },
    { question: "Translate '¿Dónde puedo encontrar algún lugar para comer?' to English.", answer: "Where can I find a place to eat?" },
    { question: "Translate '¡Eso fue divertido!' to English.", answer: "That was fun!" },
    { question: "Translate 'me lo pasé muy bien' to English.", answer: "I had a great time" },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isButtonDisabledFront, setButtonDisabledFront] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [longestStreak, setLongestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setButtonDisabled(true);
    }
    if (currentCardIndex === 0) {
      setButtonDisabledFront(false);
    }
    setUserGuess('');
  };

  const priorCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setButtonDisabled(false);
      setIsFlipped(false);
    }
    if (currentCardIndex === 0) {
      setButtonDisabledFront(true);
    }
    setUserGuess('');
  };

  const submitGuess = () => {
    const correctAns = cards[currentCardIndex].answer.toLowerCase();
    if (userGuess.toLowerCase() === correctAns && !isFlipped) {
      setCurrentStreak(currentStreak + 1);
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
      }
    } else {
      setCurrentStreak(0);
    }
  };

  const getBorderColor = () => {
    const correctAns = cards[currentCardIndex].answer.toLowerCase();
    if (userGuess.toLowerCase() === correctAns && !isFlipped) {
      return 'blue'; // Correct guess
    } else if (userGuess === '') {
      return 'black'; // Empty guess
    } else {
      return 'red'; // Incorrect guess
    }
  };

  const shuffleCards = () => {
    let randomIndex = Math.floor(Math.random() * cards.length);
    while (randomIndex === currentCardIndex) {
      randomIndex = Math.floor(Math.random() * cards.length);
    }

    setCurrentCardIndex(randomIndex);
    setIsFlipped(false);
    setButtonDisabled(false);
    setButtonDisabledFront(false);
  };

  const chngBackgroundColor = () => {
    const currQuestion = cards[currentCardIndex].question;
    if (currQuestion.includes("?") && currQuestion.includes("Spanish")) {
      return '#FF6633';
    } else if (currQuestion.length < 42) {
      return '#99CC66';
    } else if (currQuestion.includes("English")) {
      return '#FFFF99';
    }
    return 'blue';
  };

  return (
    <div className="App">
      <h2>Spanish Flash Cards!</h2>
      <br />
      <h4>Test your strength in utilizing key phrases that would be used at a Spanish-speaking university!</h4>
      <br />
      <h5>{`Total cards: ${cards.length}`}</h5>
      <div>
        <h5>Current Streak: {currentStreak}, Longest Streak: {longestStreak}</h5>
      </div>

      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick} style={{ backgroundColor: chngBackgroundColor() }}>
        <div className="front">{cards[currentCardIndex].question}</div>
        <div className="back">{cards[currentCardIndex].answer}</div>
      </div>

      <div className="guessBox">
        Guess your answer here:
        <input
          type="text" value={userGuess} onChange={(e) => setUserGuess(e.target.value)} placeholder="Place your answer here" style={{ borderColor: getBorderColor() }}
        />
        <button type="submit" onClick={submitGuess}>Submit Guess</button>
      </div>

      <div className="buttons">
        <button className="prior" onClick={priorCard} disabled={isButtonDisabledFront}>←</button>
        <button className="next" onClick={nextCard} disabled={isButtonDisabled}>⭢</button>
        <button className="shuffle" onClick={shuffleCards}>Shuffle Cards</button>
      </div>
    </div>
  );
};

export default App;

