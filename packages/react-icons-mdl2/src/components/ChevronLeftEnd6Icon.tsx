import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronLeftEnd6Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1265 1024l776 775-242 242L783 1024 1799 7l242 242-776 775zM0 0h341v2048H0V0z" />
    </svg>
  ),
  displayName: 'ChevronLeftEnd6Icon',
});

export default ChevronLeftEnd6Icon;
