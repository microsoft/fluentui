import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ButtonControlIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384h2048v1152H0V384zm1920 1024V512H128v896h1792zm-128-512v128H768V896h1024zM448 1152q-40 0-75-15t-61-41-41-61-15-75q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15zm0-256q-26 0-45 19t-19 45q0 26 19 45t45 19q26 0 45-19t19-45q0-26-19-45t-45-19z" />
    </svg>
  ),
  displayName: 'ButtonControlIcon',
});

export default ButtonControlIcon;
