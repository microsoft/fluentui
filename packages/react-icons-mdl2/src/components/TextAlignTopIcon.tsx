import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextAlignTopIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 0h1792v128H128V0zm256 512h1280v128H384V512zm-256 640v-128h1792v128H128z" />
    </svg>
  ),
  displayName: 'TextAlignTopIcon',
});

export default TextAlignTopIcon;
