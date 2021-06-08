import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShareiOSIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 250L749 525l-90-90L1088 6l429 429-90 90-275-275v1158h-128V250zm256 390h512v1408H384V640h512v128H512v1152h1152V768h-384V640z" />
    </svg>
  ),
  displayName: 'ShareiOSIcon',
});

export default ShareiOSIcon;
