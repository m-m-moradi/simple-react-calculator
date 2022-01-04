import React from 'react';
import s from './screen.module.css';
import PropTypes from 'prop-types';

export default function Screen({ text, history, pressedOperation }) {
  // TODO: Show the clicked button or result here.

  return (
    <div>
      <div className={s.history}>{history}</div>
      <div className={s.operation}>{pressedOperation}</div>
      <div className={s.screen}>{text}</div>
    </div>
  )

}

Screen.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Screen.defaultProps = {
  text: 0,
};
