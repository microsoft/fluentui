import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 0v2048H384V0h1280zm-128 128H512v1792h1024V128zm-192 1024q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19z" />
    </svg>
  ),
  displayName: 'DoorIcon',
});

export default DoorIcon;
