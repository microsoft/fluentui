import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronRightEnd6Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M249 7l1016 1017L249 2041 7 1799l776-775L7 249 249 7zm1799-7v2048h-341V0h341z" />
    </svg>
  ),
  displayName: 'ChevronRightEnd6Icon',
});

export default ChevronRightEnd6Icon;
