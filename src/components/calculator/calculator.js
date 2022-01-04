import React, { useState } from "react";
import Keypad from "../keypad";
import Screen from "../screen";
import s from "./calculator.module.css";

export default function Calculator() {
  const [digitStack, setDigitStack] = useState([]);
  const [operand, setOperand] = useState(0);
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState('')
  const [pressedOperation, setPressedOperation] = useState('')

  const addDigit2Stack = (digit) => {
    let stack = digitStack;
    stack.push(digit);

    setDigitStack((prevState) => {return stack});
    setResult((prevState) => {return digitStack.join("")});
  };

  const saveOperand = () => {
    if (digitStack.length !== 0) {
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

  const savePressedOperation = (operation) => {
    console.log(operation)
      setPressedOperation((prevState) => {return `${operation}`})
  }

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
      setHistory((prevState) => {return ""})
      setPressedOperation((prevState) => {return ""})
    },
    flip: () => {
      setOperand((prevState) => {return prevState * -1});
      setResult((prevState) => {return prevState * -1});
    },
    ans: (action, equal=false) => {

      const operand1 = operand;
      let operand2 = operand;
      if (digitStack.length !== 0) operand2 = saveOperand();

      const res = availableOperations[action](operand1, operand2);

      setResult((prevState) => {return res});
      setOperand((prevState) => {return res});
      setHistory((prevState) => {return `${operand1} ${action} ${operand2} = ${res}`})
      if (equal) {
        setOperation((prevState) => {return null});
        setPressedOperation((prevState) => {return ""})
      }
    },
  };

  return (
    <div className={s.calculator}>
      <Screen text={result} history={history} pressedOperation={pressedOperation}/>
      <Keypad addDigit2Stack={addDigit2Stack}
              availableOperations={availableOperations}
              previousOperation={operation}
              saveOperation={saveOperation}
              saveOperand={saveOperand}
              savePressedOperation={savePressedOperation}/>

    </div>
  );
}
