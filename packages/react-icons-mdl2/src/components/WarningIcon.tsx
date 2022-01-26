import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WarningIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1920H0L960 0l960 1920zM207 1792h1506L960 286 207 1792zm817-1024v640H896V768h128zm-128 768h128v128H896v-128z" />
    </svg>
  ),
  displayName: 'WarningIcon',
});

export default WarningIcon;
