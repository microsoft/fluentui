import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrowUpRight8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 0h1792v1792h-256V437L219 2011 37 1829 1611 256H256V0z" />
    </svg>
  ),
  displayName: 'ArrowUpRight8Icon',
});

export default ArrowUpRight8Icon;
