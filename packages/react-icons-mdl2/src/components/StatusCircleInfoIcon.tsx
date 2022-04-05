import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleInfoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 896h128v640H896V896zm128-256v128H896V640h128z" />
    </svg>
  ),
  displayName: 'StatusCircleInfoIcon',
});

export default StatusCircleInfoIcon;
