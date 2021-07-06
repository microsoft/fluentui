import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrowTallUpRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v1152h-128V219L109 2029l-90-90L1829 128H896V0h1152z" />
    </svg>
  ),
  displayName: 'ArrowTallUpRightIcon',
});

export default ArrowTallUpRightIcon;
