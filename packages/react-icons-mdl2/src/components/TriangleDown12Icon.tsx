import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriangleDown12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h2048L1024 2048 0 0zm276 171l748 1495 748-1495H276z" />
    </svg>
  ),
  displayName: 'TriangleDown12Icon',
});

export default TriangleDown12Icon;
