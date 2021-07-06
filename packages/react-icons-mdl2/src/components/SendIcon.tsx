import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SendIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1997 960L18 1843l220-883L18 77l1979 883zM206 301l149 598h1190L206 301zm147 726l-147 592 1327-592H353z" />
    </svg>
  ),
  displayName: 'SendIcon',
});

export default SendIcon;
