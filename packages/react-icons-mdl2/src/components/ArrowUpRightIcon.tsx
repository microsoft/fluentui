import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrowUpRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 256h1408v1408h-128V475L347 1792l-91-91L1573 384H384V256z" />
    </svg>
  ),
  displayName: 'ArrowUpRightIcon',
});

export default ArrowUpRightIcon;
