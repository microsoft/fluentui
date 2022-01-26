import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrangeSendToBackIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 1536h512v128H384v-640h128v512zM1536 512h-512V384h640v640h-128V512zM896 896H0V0h896v896zM768 128H128v640h640V128zm1280 1024v896h-896v-896h896zm-128 128h-640v640h640v-640z" />
    </svg>
  ),
  displayName: 'ArrangeSendToBackIcon',
});

export default ArrangeSendToBackIcon;
