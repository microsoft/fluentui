import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FlickLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1024L0 2048V0l1024 1024z" />
    </svg>
  ),
  displayName: 'FlickLeftIcon',
});

export default FlickLeftIcon;
