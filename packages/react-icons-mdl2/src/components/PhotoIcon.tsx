import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PhotoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h2048v1536H0V256zm1920 1408V384H128v1280h1792zM1792 512v1024H256V512h1536zm-128 896V640H384v768h1280z" />
    </svg>
  ),
  displayName: 'PhotoIcon',
});

export default PhotoIcon;
