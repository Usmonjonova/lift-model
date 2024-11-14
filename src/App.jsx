import { useState } from 'react';
import './App.css';
import arrowUp from './images/arrow-down.svg';
import arrowDown from './images/arrow-up.svg';
import styled, { keyframes } from 'styled-components';

const createKeyframes = (steps, upDown) => {
  const keyframesArray = [];
  const stepPercentage = 100 / (steps - 1);

  for (let i = 0; i < steps; i++) {
    keyframesArray.push(`
        ${i * stepPercentage}% { transform: translateY(${-77 * i}px); }
      `);
  }
  return keyframes`${keyframesArray.join(" ")}`;
};

const LiftItem = styled.div`
    animation: ${({ steps }) => createKeyframes(steps)} 3s forwards;
  `;


function App() {
  const [clickedFloorNumber, setClickedFloorNumber] = useState(1);
  const [upFloor, setUpFloor] = useState(true)

  const floors = [
    { id: 7, floorNumber: 7 },
    { id: 6, floorNumber: 6 },
    { id: 5, floorNumber: 5 },
    { id: 4, floorNumber: 4 },
    { id: 3, floorNumber: 3 },
    { id: 2, floorNumber: 2 },
    { id: 1, floorNumber: 1 }
  ];

  function handleFloorUp(floorNumber) {
    setClickedFloorNumber(floorNumber);
    setUpFloor(true)
  }

  function handleFloorDown(floorNumber) {
    setClickedFloorNumber(floorNumber);
    setUpFloor(false)
  }

  return (
    <div className="lift-control-wrapper">
      <div className="lift-wrapper">
        <div className="lift">
          <LiftItem steps={clickedFloorNumber} className="lift-item">{clickedFloorNumber}</LiftItem>
        </div>
      </div>
      <div className="control-wrapper">
        <div className="lift-floor-number">
          {
            floors.map(floor => (
              <div key={floor.id} className="floor-number-wrap">
                <div className="floor-number">{floor.floorNumber}</div>

                {floor.id !== 7 && (
                  <div onClick={() => handleFloorDown(floor.id)} className="arrow-down">
                    <img src={arrowDown} alt="arrow-down" />
                  </div>
                )}
                {floor.id !== 1 && (
                  <div onClick={() => handleFloorUp(floor.id)} className="arrow-up">
                    <img src={arrowUp} alt="arrow-up" />
                  </div>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
