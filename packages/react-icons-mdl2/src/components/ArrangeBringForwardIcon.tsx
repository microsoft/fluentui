import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrangeBringForwardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1664H0V0h1664v1664zM1536 128H128v1408h1408V128zm512 640v1280H768v-256h128v128h1024V896h-128V768h256z" />
    </svg>
  ),
  displayName: 'ArrangeBringForwardIcon',
});

export default ArrangeBringForwardIcon;
