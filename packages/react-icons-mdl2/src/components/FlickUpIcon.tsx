import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FlickUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1024L0 0h2048L1024 1024z" />
    </svg>
  ),
  displayName: 'FlickUpIcon',
});

export default FlickUpIcon;
