import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignJustifyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v128H0V128h2048zM0 1664h2048v128H0v-128zm0-768h2048v128H0V896zm0-384h2048v128H0V512zm0 768h2048v128H0v-128z" />
    </svg>
  ),
  displayName: 'AlignJustifyIcon',
});

export default AlignJustifyIcon;
