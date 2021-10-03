import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleCheckmarkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1453 941l-621 621-365-365 90-90 275 275 531-531 90 90z" />
    </svg>
  ),
  displayName: 'StatusCircleCheckmarkIcon',
});

export default StatusCircleCheckmarkIcon;
