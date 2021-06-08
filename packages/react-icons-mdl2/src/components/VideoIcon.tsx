import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VideoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1544l-512-256v248H0V512h1536v248l512-256v1040zm-640-904H128v768h1280V640zm512 71l-384 193v240l384 193V711z" />
    </svg>
  ),
  displayName: 'VideoIcon',
});

export default VideoIcon;
