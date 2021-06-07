import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EraseToolIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1115 1792h421v128H453L50 1516q-24-24-37-56t-13-68q0-35 13-67t38-58L1248 69l794 795-927 928zm133-1542L538 960l614 613 709-709-613-614zM933 1792l128-128-613-614-306 307q-14 14-14 35t14 35l364 365h427z" />
    </svg>
  ),
  displayName: 'EraseToolIcon',
});

export default EraseToolIcon;
