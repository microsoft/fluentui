import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1939 467l90 90-1005 1005L19 557l90-90 915 915 915-915z" />
    </svg>
  ),
  displayName: 'ChevronDownIcon',
});

export default ChevronDownIcon;
