import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrowDownRightMirrored8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 256H0v1792h1792v-256H437L2011 219 1829 37 256 1611V256z" />
    </svg>
  ),
  displayName: 'ArrowDownRightMirrored8Icon',
});

export default ArrowDownRightMirrored8Icon;
