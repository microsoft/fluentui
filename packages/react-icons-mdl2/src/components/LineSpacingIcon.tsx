import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LineSpacingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M448 102l365 365-90 90-211-210v549H384V347L173 557l-90-90 365-365zm275 1389l90 90-365 365-365-365 90-90 211 210v-549h128v549l211-210zM2048 384v128H1024V384h1024zM1024 768h1024v128H1024V768zm0 384h1024v128H1024v-128zm0 384h1024v128H1024v-128z" />
    </svg>
  ),
  displayName: 'LineSpacingIcon',
});

export default LineSpacingIcon;
