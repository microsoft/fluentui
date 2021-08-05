import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrivalsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1216q0 40-15 75t-41 61-61 41-75 15H128L0 896h384l32 128h256L512 384h320l320 640h576q40 0 75 15t61 41 41 61 15 75zm-1692 64h1500q26 0 45-19t19-45q0-26-19-45t-45-19h-655q-78-162-158-320T753 512h-77q40 161 79 320t81 320H316l-16-64-16-64H164l64 256zm1820 384v128H640v-128h1408z" />
    </svg>
  ),
  displayName: 'ArrivalsIcon',
});

export default ArrivalsIcon;
