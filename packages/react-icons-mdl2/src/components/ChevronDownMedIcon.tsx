import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronDownMedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1657L25 658l121-121 878 878 878-878 121 121-999 999z" />
    </svg>
  ),
  displayName: 'ChevronDownMedIcon',
});

export default ChevronDownMedIcon;
