import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChopsticksIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 709q0 26-19 45t-45 19H768v379h832q26 0 45 19t19 45q0 115-29 221t-84 199-130 168-168 130-199 84-222 30q-115 0-221-29t-199-84-168-130-130-168-84-199-30-222q0-26 19-45t45-19h576V773H512v187q0 26-19 45t-45 19q-26 0-45-19t-19-45V773H192q-26 0-45-19t-19-45q0-26 19-45t45-19h192V489l-40 8q-25 5-52 10t-51 9-38 4q-26 0-45-19t-19-45q0-23 15-41t38-22l1659-292q4-1 11-1 26 0 45 19t19 45q0 23-15 41t-38 22L768 422v223h1088q26 0 45 19t19 45zM832 1920q136 0 258-49t216-135 155-203 72-253H131q12 136 72 253t154 203 217 135 258 49zM512 645h128V444l-128 23v178z" />
    </svg>
  ),
  displayName: 'ChopsticksIcon',
});

export default ChopsticksIcon;
