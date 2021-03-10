import React, { useEffect, useState } from "react";

import {
  ADD,
  CLEAR,
  DIVIDE,
  EQUAL,
  getResult,
  MULTIPLY,
  operators,
  SCIENTIFICMODE,
  SIGN,
  SQROOT,
  SQUARE,
  SUBTRACT,
} from "./utils";

export const Calculator = () => {
  const [theme, setTheme] = useState("light");
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [output, setoutput] = useState(0);
  const [hasSceintificMode, setHasSceintificMode] = useState(false);

  useEffect(() => {
    console.log("firing");
    if (theme === "light") {
      const elements = document.getElementsByClassName("Dark-theme");
      [...elements].map((element) => {
        element.classList.remove("Dark-theme");
        element.classList.add("Light-theme");
        return 0;
      });
    } else {
      const elements = document.getElementsByClassName("Light-theme");
      [...elements].map((element) => {
        element.classList.remove("Light-theme");
        element.classList.add("Dark-theme");
        return 0;
      });
    }
  }, [theme]);

  const clickHandler = (value) => {
    if (output && !secondNumber) setFirstNumber(output);
    if (operators.includes(value)) {
      if (!firstNumber && !output) return;
      else if (!secondNumber) setOperator(value);
      else {
        const result = getResult(firstNumber, secondNumber, operator);
        setFirstNumber(result);
        setSecondNumber(null);
        setoutput(result);
        setOperator(value);
      }
    } else {
      const intValue = parseInt(value);
      if (!firstNumber) {
        setFirstNumber(intValue);
        setoutput(intValue);
      } else if (firstNumber && !operator) {
        setFirstNumber(firstNumber * 10 + intValue);
        setoutput(firstNumber * 10 + intValue);
      } else if (!secondNumber) {
        setSecondNumber(intValue);
        setoutput(intValue);
      } else {
        setSecondNumber(secondNumber * 10 + intValue);
        setoutput(secondNumber * 10 + intValue);
      }
    }
  };

  const handleClear = (clearoutput) => {
    setFirstNumber(null);
    setSecondNumber(null);
    setOperator(null);
    if (clearoutput) setoutput(0);
  };

  const handleEqual = () => {
    if (firstNumber && secondNumber && operator) {
      setoutput(getResult(firstNumber, secondNumber, operator));
      handleClear();
    }
  };

  const handleScientificMode = (id) => {
    console.log("clicked");
    if (id === SCIENTIFICMODE) setHasSceintificMode(!hasSceintificMode);
    else {
      if (firstNumber && secondNumber && output) {
        const initialResult = getResult(firstNumber, secondNumber, operator);
        setoutput(getResult(initialResult, secondNumber, id));
      } else if (firstNumber)
        setoutput(getResult(firstNumber, secondNumber, id));
      else if (output) setoutput(getResult(output, secondNumber, id));
      handleClear();
    }
  };
  console.log(firstNumber, secondNumber, operator, output);
  return (
    <div className="Calculator-wrapper Light-theme">
      <div className="Content-wrapper">
        <div className="Theme-wrapper">
          <button onClick={() => setTheme("light")}>Light Theme</button>
          <button onClick={() => setTheme("dark")}>Dark Theme</button>
        </div>
        <div id="output" className="Output-wrapper Light-theme">
          <h2>{output}</h2>
        </div>
        <table
          id="table"
          className="Calculator-Table Light-theme"
          onClick={(e) => clickHandler(e.target.id)}
        >
          <tr>
            {["1", "2", "3"].map((item) => getColumns(item))}
            <td data-isactive={ADD === operator} id={ADD}>
              Add(+)
            </td>
          </tr>
          <tr>
            {["4", "5", "6"].map((item) => getColumns(item))}
            <td data-isactive={SUBTRACT === operator} id={SUBTRACT}>
              Subtract(-)
            </td>
          </tr>
          <tr>
            {["7", "8", "9"].map((item) => getColumns(item))}
            <td data-isactive={MULTIPLY === operator} id={MULTIPLY}>
              Multiply(*)
            </td>
          </tr>
          <tr>
            <td
              onClick={(e) => {
                e.stopPropagation();
                handleClear(true);
              }}
              id={CLEAR}
            >
              Clear
            </td>
            {getColumns(0)}
            <td
              onClick={(e) => {
                e.stopPropagation();
                handleEqual();
              }}
              id={EQUAL}
            >
              =
            </td>
            <td data-isactive={DIVIDE === operator} id={DIVIDE}>
              Divide (/)
            </td>
          </tr>
          <tr
            onClick={(e) => {
              e.stopPropagation();
              handleScientificMode(e.target.id);
            }}
          >
            <td id={SCIENTIFICMODE}>Scientific Mode</td>
            {hasSceintificMode && (
              <>
                <td id={SIGN}>Sign (+/-)</td>
                <td id={SQUARE}>Square (²)</td>
                <td id={SQROOT}>Sq. Root (√)</td>{" "}
              </>
            )}
          </tr>
        </table>
      </div>
    </div>
  );
};

const getColumns = (id) => (
  <td key={`item${id}`} id={id}>
    {parseInt(id)}
  </td>
);
