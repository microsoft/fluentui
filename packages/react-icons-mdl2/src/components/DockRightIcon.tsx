import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DockRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384h2048v1152H0V384zm128 128v896h1280V512H128zm1792 896V512h-384v896h384z" />
    </svg>
  ),
  displayName: 'DockRightIcon',
});

export default DockRightIcon;
