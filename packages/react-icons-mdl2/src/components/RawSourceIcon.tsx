import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RawSourceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 512H0V384h896v128zM384 768h896v128H384V768zm1024 0h640v128h-640V768zm640-384v128H1024V384h1024zM384 1152h1280v128H384v-128zM0 1536h1280v128H0v-128z" />
    </svg>
  ),
  displayName: 'RawSourceIcon',
});

export default RawSourceIcon;
