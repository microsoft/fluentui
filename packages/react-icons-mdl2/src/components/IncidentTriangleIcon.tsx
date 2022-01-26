import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IncidentTriangleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 2048H0L960 128l960 1920zm-896-384H896v128h128v-128zm0-128V896H896v640h128z" />
    </svg>
  ),
  displayName: 'IncidentTriangleIcon',
});

export default IncidentTriangleIcon;
