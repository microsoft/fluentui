import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronDownSmallIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
    </svg>
  ),
  displayName: 'ChevronDownSmallIcon',
});

export default ChevronDownSmallIcon;
