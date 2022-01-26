import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LandscapeOrientationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 677v1115H0V128h1499l549 549zm-512-37h293l-293-293v293zm384 1024V768h-512V256H128v1408h1792z" />
    </svg>
  ),
  displayName: 'LandscapeOrientationIcon',
});

export default LandscapeOrientationIcon;
