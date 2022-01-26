import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrowTallDownLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M219 1920h933v128H0V896h128v933L1939 19l90 90L219 1920z" />
    </svg>
  ),
  displayName: 'ArrowTallDownLeftIcon',
});

export default ArrowTallDownLeftIcon;
