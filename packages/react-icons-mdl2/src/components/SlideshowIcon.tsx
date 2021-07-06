import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SlideshowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 1024l-512 256V768l512 256zm-416 101l201-101-201-101v202zm1184-869v1536H0V256h2048zm-128 128H128v1280h1792V384zm-128 1152H256V512h1536v1024zm-128-896H384v768h1280V640z" />
    </svg>
  ),
  displayName: 'SlideshowIcon',
});

export default SlideshowIcon;
