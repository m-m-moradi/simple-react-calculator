import React from 'react';
import s from './keypad.module.css';
import Button from '../button';
import cx from 'classnames';

export default function Keypad() {
  const handleButtonClick = (button) => {
    // TODO: handle clicking here.
    console.log(button);
    console.log(
            button.isAction ? s.dark : s.light
)
  };

  const buttons = [
    { text: 'C', isAction: true },
    { text: '+/-', isAction: true },
    { text: '%', isAction: true },
    { text: '÷', isAction: true },
    { text: '7' },
    { text: '8' },
    { text: '9' },
    { text: 'x', isAction: true },
    { text: '4' },
    { text: '5' },
    { text: '6' },
    { text: '-', isAction: true },
    { text: '1' },
    { text: '2' },
    { text: '3' },
    { text: '+', isAction: true },
    { text: '0', isLarge: true },
    { text: '.' },
    { text: '=', isAction: true },
  ];
  console.log(s.dark)

  return (
    <div className={s.keypad}>
      {buttons.map((button) => (
        <Button
          key={button.text}
          text={button.text}
          onClick={() => handleButtonClick(button)}
          className={cx(
            button.isLarge && s['button-2x'],
            button.isAction ? s.dark : s.light
          )}
        />
      ))}
    </div>
  );
}
