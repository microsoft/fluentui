import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleErrorXIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1050 1088l371 371-90 90-371-371-371 371-90-90 371-371-371-371 90-90 371 371 371-371 90 90-371 371z" />
    </svg>
  ),
  displayName: 'StatusCircleErrorXIcon',
});

export default StatusCircleErrorXIcon;
