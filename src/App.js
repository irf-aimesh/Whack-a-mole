import React, { useState, useEffect } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [highScore, setHighScore] = useState(0);

  const toggleGame = () => {
    if (!gameActive && timeLeft === 0) {
      setTimeLeft(15);
    }
    setGameActive(!gameActive);
    if (!gameActive) {
      setScore(0);
    }
  };

  const whackMole = (index) => {
    if (gameActive && moles[index]) {
      setScore(score + 10);
      setMoles(moles.map((_, i) => (i === index ? false : moles[i])));
    }
  };

  useEffect(() => {
    if (!gameActive) return;

    const moleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoles(moles.map((_, i) => i === randomIndex));

      setTimeout(() => {
        setMoles(moles.map((_, i) => (i === randomIndex ? false : moles[i])));
      }, 800);
    }, 1000);

    return () => clearInterval(moleInterval);
  }, [gameActive, moles]);

  useEffect(() => {
    if (!gameActive || timeLeft <= 0) {
      if (timeLeft === 0) {
        setGameActive(false);
        setHighScore(Math.max(highScore, score));
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  return (
    <div style={{
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        color: '#4a4a4a',
        fontSize: '2.5rem',
        marginBottom: '10px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        Whack-a-Mole! <span style={{ fontSize: '1.5rem' }}>🔨</span>
      </h1>

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '20px 0',
        background: 'rgba(255,255,255,0.7)',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <div>
          <p style={{ margin: '0', fontWeight: 'bold', color: '#666' }}>SCORE</p>
          <p style={{
            margin: '0',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#4a4a4a'
          }}>{score}</p>
        </div>
        <div>
          <p style={{ margin: '0', fontWeight: 'bold', color: '#666' }}>TIME</p>
          <p style={{
            margin: '0',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: timeLeft <= 5 ? '#e74c3c' : '#4a4a4a'
          }}>{timeLeft}s</p>
        </div>
        <div>
          <p style={{ margin: '0', fontWeight: 'bold', color: '#666' }}>BEST</p>
          <p style={{
            margin: '0',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#4a4a4a'
          }}>{highScore}</p>
        </div>
      </div>

      <button
        onClick={toggleGame}
        style={{
          padding: '12px 30px',
          fontSize: '1.1rem',
          background: gameActive ? '#e74c3c' : '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          margin: '10px',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.3s'
        }}
      >
        {gameActive ? "STOP" : "START GAME"}
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        margin: '30px auto',
        maxWidth: '350px'
      }}>
        {moles.map((isUp, index) => (
          <div
            key={index}
            style={{
              width: '100%',
              aspectRatio: '1/1',
              background: '#8B4513',
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'inset 0 8px 0 rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
            onClick={() => whackMole(index)}
          >
            <div style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              background: isUp ? '#D2B48C' : '#654321',
              borderRadius: '50%',
              bottom: isUp ? '10%' : '-50%',
              left: '10%',
              transition: 'bottom 0.2s ease-out',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem'
            }}>
              {isUp && '🐭'}
            </div>
          </div>
        ))}
      </div>

      {timeLeft === 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          padding: '20px',
          borderRadius: '10px',
          marginTop: '20px',
          animation: 'fadeIn 0.5s'
        }}>
          <h2 style={{
            color: '#2ecc71',
            margin: '0 0 10px 0'
          }}>Game Over!</h2>
          <p style={{ fontSize: '1.2rem', margin: '5px' }}>
            Your score: <strong>{score}</strong>
          </p>
          {score === highScore && score > 0 && (
            <p style={{
              color: '#f39c12',
              fontWeight: 'bold',
              margin: '5px'
            }}>New High Score! 🎉</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
