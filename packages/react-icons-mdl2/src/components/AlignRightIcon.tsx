import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v128H0V128zm0 1664v-128h2048v128H0zm0-768V896h2048v128H0zm512-384V512h1536v128H512zm0 768v-128h1536v128H512z" />
    </svg>
  ),
  displayName: 'AlignRightIcon',
});

export default AlignRightIcon;
