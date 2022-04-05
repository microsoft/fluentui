import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusTriangleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1472 896l576 1152H896l576-1152z" />
    </svg>
  ),
  displayName: 'StatusTriangleIcon',
});

export default StatusTriangleIcon;
