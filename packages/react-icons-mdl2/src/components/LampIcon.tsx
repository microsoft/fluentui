import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LampIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1920h384v128H512v-128h384V896H231L530 0h860l299 896h-409v192q0 26-19 45t-45 19q-26 0-45-19t-19-45V896h-128v1024zM409 768h1102l-213-640H622L409 768z" />
    </svg>
  ),
  displayName: 'LampIcon',
});

export default LampIcon;
