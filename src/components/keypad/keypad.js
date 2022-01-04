import React from "react";
import s from "./keypad.module.css";
import Button from "../button";
import cx from "classnames";

export default function Keypad({ addDigit2Stack, availableOperations, previousOperation, saveOperation, saveOperand ,savePressedOperation}) {
  const handleButtonClick = (button) => {
    if (button.isAction) {
      switch (button.text) {
        case "C":
          availableOperations.cls()
          break;
        case "+/-":
          availableOperations.flip()
          break;
        default:
          saveOperation(button.text)
          savePressedOperation(button.text)
          if (previousOperation){
            availableOperations.ans(previousOperation, button.text === '=' ? true: false);
          } else
             saveOperand()
      }
    } else
      addDigit2Stack(button.text);
  };

  const buttons = [
    { text: "C", isAction: true },
    { text: "+/-", isAction: true },
    { text: "%", isAction: true },
    { text: "÷", isAction: true },
    { text: "7" },
    { text: "8" },
    { text: "9" },
    { text: "x", isAction: true },
    { text: "4" },
    { text: "5" },
    { text: "6" },
    { text: "-", isAction: true },
    { text: "1" },
    { text: "2" },
    { text: "3" },
    { text: "+", isAction: true },
    { text: "0", isLarge: true },
    { text: "." },
    { text: "=", isAction: true },
  ];

  return (
    <div className={s.keypad}>
      {buttons.map((button) => (
        <Button key={button.text}
                text={button.text}
                onClick={() => handleButtonClick(button)}
                className={cx(button.isLarge && s["button-2x"], button.isAction ? s.dark : s.light)}/>
      ))}
    </div>
  );
}
