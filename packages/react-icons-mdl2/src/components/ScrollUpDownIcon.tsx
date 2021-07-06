import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ScrollUpDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 219L429 813l-90-90 685-686 685 686-90 90-595-594zm0 1610l595-594 90 90-685 686-685-686 90-90 595 594z" />
    </svg>
  ),
  displayName: 'ScrollUpDownIcon',
});

export default ScrollUpDownIcon;
