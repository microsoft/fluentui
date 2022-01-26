import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VideoSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1408V512h1408v896H0zm1536-640l512-256v896l-512-256V768z" />
    </svg>
  ),
  displayName: 'VideoSolidIcon',
});

export default VideoSolidIcon;
