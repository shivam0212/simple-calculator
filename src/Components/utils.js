export const ADD = "add";
export const CLEAR = "clear";
export const DIVIDE = "divide";
export const EQUAL = "equal";
export const MULTIPLY = "multiply";
export const SCIENTIFICMODE = "scientificMode";
export const SIGN = "sign";
export const SQROOT = "sqroot";
export const SQUARE = "square";
export const SUBTRACT = "subtract";

export const operators = [ADD, SUBTRACT, MULTIPLY, DIVIDE];

const calculate = (firstNumber, secondNumber) => {
  return {
    add: () => firstNumber + secondNumber,
    divide: () => firstNumber / secondNumber,
    multiply: () => firstNumber * secondNumber,
    sign: () => firstNumber * -1,
    sqroot: () => Math.sqrt(firstNumber),
    square: () => Math.pow(firstNumber, 2),
    subtract: () => firstNumber - secondNumber,
  };
};

export const getResult = (firstNumber, secondNumber, operation) => {
  const value = calculate(firstNumber, secondNumber);
  if (operation === ADD) return value.add();
  if (operation === DIVIDE) return value.divide();
  if (operation === MULTIPLY) return value.multiply();
  if (operation === SIGN) return value.sign();
  if (operation === SQROOT) return value.sqroot();
  if (operation === SQUARE) return value.square();
  if (operation === SUBTRACT) return value.subtract();
};
