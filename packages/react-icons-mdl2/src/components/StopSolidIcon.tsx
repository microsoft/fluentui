import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StopSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 128h1792v1792H128V128z" />
    </svg>
  ),
  displayName: 'StopSolidIcon',
});

export default StopSolidIcon;
