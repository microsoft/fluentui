import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextCalloutIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1408H0V256h2048zm-128 128H128v1152h1792V384zm-256 640h-640V896h640v128zm-896 0H384V896h384v128z" />
    </svg>
  ),
  displayName: 'TextCalloutIcon',
});

export default TextCalloutIcon;
