import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ThumbnailViewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1152h640v640H0v-640zm128 512h384v-384H128v384zM0 256h640v640H0V256zm128 512h384V384H128v384zm1920-384v128H896V384h1152zm-384 384H896V640h768v128zm-768 512h1152v128H896v-128zm0 256h768v128H896v-128z" />
    </svg>
  ),
  displayName: 'ThumbnailViewIcon',
});

export default ThumbnailViewIcon;
