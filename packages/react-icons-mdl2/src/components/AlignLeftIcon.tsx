import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v128H0V128h2048zm0 1664H0v-128h2048v128zm0-768H0V896h2048v128zm-512-384H0V512h1536v128zm0 768H0v-128h1536v128z" />
    </svg>
  ),
  displayName: 'AlignLeftIcon',
});

export default AlignLeftIcon;
