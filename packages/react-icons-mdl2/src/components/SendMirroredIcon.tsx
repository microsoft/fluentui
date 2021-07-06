import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SendMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2030 77l-220 883 220 883L51 960 2030 77zm-337 822l149-598L503 899h1190zm149 720l-147-592H515l1327 592z" />
    </svg>
  ),
  displayName: 'SendMirroredIcon',
});

export default SendMirroredIcon;
