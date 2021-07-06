import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronUpMedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1902 1511l-878-878-878 878-121-121 999-999 999 999-121 121z" />
    </svg>
  ),
  displayName: 'ChevronUpMedIcon',
});

export default ChevronUpMedIcon;
