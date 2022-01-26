import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrowUpRightMirrored8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 0H0v1792h256V437l1573 1574 182-182L437 256h1355V0z" />
    </svg>
  ),
  displayName: 'ArrowUpRightMirrored8Icon',
});

export default ArrowUpRightMirrored8Icon;
