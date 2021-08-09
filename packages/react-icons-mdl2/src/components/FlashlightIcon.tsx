import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FlashlightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v1152h-475l-256-256H0V640h1317l256-256h475zM128 1152h1152V768H128v384zm1499 256h37V512h-37l-219 219v458l219 219zm293-896h-128v896h128V512zm-832 384q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19z" />
    </svg>
  ),
  displayName: 'FlashlightIcon',
});

export default FlashlightIcon;
