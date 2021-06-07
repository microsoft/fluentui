import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriangleLeft12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1024L2048 0v2048L0 1024zm1877 748V276L382 1024l1495 748z" />
    </svg>
  ),
  displayName: 'TriangleLeft12Icon',
});

export default TriangleLeft12Icon;
