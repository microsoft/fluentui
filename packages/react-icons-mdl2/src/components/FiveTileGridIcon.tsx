import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FiveTileGridIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h2048v1408H0V256zm1024 128v512h384V384h-384zM896 1536V384H128v1152h768zm512 0v-512h-384v512h384zm512 0v-512h-384v512h384zm-384-640h384V384h-384v512z" />
    </svg>
  ),
  displayName: 'FiveTileGridIcon',
});

export default FiveTileGridIcon;
