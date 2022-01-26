import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronRightMedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M658 2023l-121-121 878-878-878-878L658 25l999 999-999 999z" />
    </svg>
  ),
  displayName: 'ChevronRightMedIcon',
});

export default ChevronRightMedIcon;
