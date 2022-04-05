import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PinSolidOff12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 512v853h-85q-38 0-75-8t-73-21L825 345q78 8 150 35t134 71 113 103 84 129h317q60-81 150-126t190-45h85zM25 146L146 25l1877 1877-121 121-689-689q-42 48-93 85t-108 64-118 39-126 14h-85v-512H171L0 939l171-86h512v-50L25 146z" />
    </svg>
  ),
  displayName: 'PinSolidOff12Icon',
});

export default PinSolidOff12Icon;
