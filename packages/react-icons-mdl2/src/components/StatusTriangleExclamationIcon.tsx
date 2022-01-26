import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusTriangleExclamationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1792H896v-128h128v128zm0-256H896V896h128v640z" />
    </svg>
  ),
  displayName: 'StatusTriangleExclamationIcon',
});

export default StatusTriangleExclamationIcon;
