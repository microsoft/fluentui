import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronUpSmallIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 441l1017 1017-242 241-775-775-775 775L7 1458 1024 441z" />
    </svg>
  ),
  displayName: 'ChevronUpSmallIcon',
});

export default ChevronUpSmallIcon;
