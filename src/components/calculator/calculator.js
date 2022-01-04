import React, { useState } from "react";
import Keypad from "../keypad";
import Screen from "../screen";
import s from "./calculator.module.css";

export default function Calculator() {
  const [digitStack, setDigitStack] = useState([]);
  const [operand, setOperand] = useState(0);
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(0);

  const addDigit2Stack = (digit) => {
    let stack = digitStack;
    stack.push(digit);

    setDigitStack((prevState) => {return stack});
    setResult((prevState) => {return digitStack.join("")});
  };

  const saveOperand = () => {
    if (digitStack.length != 0) {
      const newOperand = parseFloat(digitStack.join(""));
      setDigitStack((prevState) => {return []});
      setOperand((prevState) => {return newOperand});
      return newOperand
    }
  };

  const saveOperation = (newOperation) => {
    setOperation((prevState) => {return newOperation});
    // why this this does not work
    // setOperation(op)
  };

  const availableOperations = {
    "+": (a, b) => {
      return a + b;
    },
    "-": (a, b) => {
      return a - b;
    },
    'x': (a, b) => {
      return a * b;
    },
    "÷": (a, b) => {
      return a / b;
    },
    "%": (a, b) => {
      return a % b;
    },
    cls: () => {
      setOperand((prevState) => {return 0});
      setResult((prevState) => {return 0});
      setOperation((prevState) => {return null});
    },
    flip: () => {
      setOperand((prevState) => {return prevState * -1});
      setResult((prevState) => {return prevState * -1});
    },
    ans: (action, equal=false) => {

      const operand1 = operand;
      let operand2 = operand;
      if (digitStack.length != 0) operand2 = saveOperand();

      const res = action(operand1, operand2);

      setResult((prevState) => {return res});
      setOperand((prevState) => {return res});
      if (equal)
        setOperation((prevState) => {return null});
    },
  };

  return (
    <div className={s.calculator}>
      <Screen text={result} />
      <Keypad addDigit2Stack={addDigit2Stack}
              availableOperations={availableOperations}
              previousOperation={operation}
              saveOperation={saveOperation}
              saveOperand={saveOperand}/>
    </div>
  );
}
