import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusTriangleOuterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 2048H0L960 128l960 1920z" />
    </svg>
  ),
  displayName: 'StatusTriangleOuterIcon',
});

export default StatusTriangleOuterIcon;
