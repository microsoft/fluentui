import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1443 2045L421 1024 1443 3l90 90-930 931 930 931-90 90z" />
    </svg>
  ),
  displayName: 'ChevronLeftIcon',
});

export default ChevronLeftIcon;
