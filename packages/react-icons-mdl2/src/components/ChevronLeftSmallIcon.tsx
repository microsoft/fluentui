import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronLeftSmallIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1699 249l-775 775 775 775-241 242L441 1024 1458 7l241 242z" />
    </svg>
  ),
  displayName: 'ChevronLeftSmallIcon',
});

export default ChevronLeftSmallIcon;
