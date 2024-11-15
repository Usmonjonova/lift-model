import React, { useEffect, useState } from "react";
import arrowUp from "./images/arrow-up.svg";
import arrowDown from "./images/arrow-down.svg";
import "./App.css";

const App = () => {
  const [liftModel, setLiftModel] = useState([
    {
      isItWorking: true,
      prevFloor: 1,
      currentFloor: 1,
      nextFloor: 1,
      upFloor: false,
      downFloor: false,
    },
  ]);

  const floors = [
    { id: 7, floorNumber: 7 },
    { id: 6, floorNumber: 6 },
    { id: 5, floorNumber: 5 },
    { id: 4, floorNumber: 4 },
    { id: 3, floorNumber: 3 },
    { id: 2, floorNumber: 2 },
    { id: 1, floorNumber: 1 },
  ];

  useEffect(() => {
    if (liftModel[0].nextFloor !== liftModel[0].prevFloor) {

      createLiftAnimation(liftModel[0].prevFloor, liftModel[0].nextFloor);
    }
  }, [liftModel]);

  const createLiftAnimation = (prevFloor, nextFloor) => {
    const startY = -(prevFloor - 1) * 77;
    const endY = -(nextFloor - 1) * 77;

    const styleSheet = document.styleSheets[0];
    const animationName = "lift-move";
    const keyframes = `
      @keyframes ${animationName} {
        0% { transform: translateY(${startY}px); }
        100% { transform: translateY(${endY}px); }
      }
    `;

    for (let i = 0; i < styleSheet.cssRules.length; i++) {

      if (styleSheet.cssRules[i].name === animationName) {

        console.log(styleSheet.cssRules[i]);
        styleSheet.deleteRule(i);
        break;
      }
    }

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  };

  const moveLiftTo = (floorNumber) => {
    setLiftModel((prevModel) => {
      const updatedModel = {
        ...prevModel[0],
        prevFloor: prevModel[0].currentFloor,
        currentFloor: floorNumber,
        nextFloor: floorNumber,
        upFloor: floorNumber > prevModel[0].currentFloor,
        downFloor: floorNumber < prevModel[0].currentFloor,
      };
      return [updatedModel];
    });
  };

  return (
    <div className="lift-control-wrapper">
      <div className="lift-wrapper">
        <div className="lift">
          <div
            className="lift-item">{liftModel[0].currentFloor}</div>
        </div>
      </div>

      <div className="control-wrapper">
        <div className="lift-floor-number">
          {floors.map((floor) => (
            <div key={floor.id} className="floor-number-wrap">
              <div className="floor-number">{floor.floorNumber}</div>
              {floor.id !== 1 && (
                <div onClick={() => moveLiftTo(floor.floorNumber)} className="arrow-down">
                  <img src={arrowDown} alt="Move Down" aria-label="Move to a lower floor" />
                </div>
              )}
              {floor.id !== 7 && (
                <div onClick={() => moveLiftTo(floor.floorNumber)} className="arrow-up">
                  <img src={arrowUp} alt="Move Up" aria-label="Move to a higher floor" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
