import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronLeftMedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1390 2023l-999-999 999-999 121 121-878 878 878 878-121 121z" />
    </svg>
  ),
  displayName: 'ChevronLeftMedIcon',
});

export default ChevronLeftMedIcon;
