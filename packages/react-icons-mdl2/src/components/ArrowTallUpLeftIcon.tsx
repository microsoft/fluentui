import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrowTallUpLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1939 2029L128 219v933H0V0h1152v128H219l1810 1811-90 90z" />
    </svg>
  ),
  displayName: 'ArrowTallUpLeftIcon',
});

export default ArrowTallUpLeftIcon;
