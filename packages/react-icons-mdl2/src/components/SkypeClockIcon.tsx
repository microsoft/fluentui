import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SkypeClockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1431 1705q28 28 43 65t15 77q0 42-15 78t-43 64-63 43-79 16q-83 0-142-59l-594-593q-28-28-43-65t-15-77V201q0-42 15-78t43-64 63-43 79-16q42 0 78 16t64 43 43 63 16 79v970l535 534z" />
    </svg>
  ),
  displayName: 'SkypeClockIcon',
});

export default SkypeClockIcon;
