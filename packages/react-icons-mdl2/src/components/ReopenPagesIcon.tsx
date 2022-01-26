import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReopenPagesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 640h512v1280H512v-512H0V128h1536v512zm384 128h-384v128h384V768zm-512-512H128v128h1280V256zM128 512v768h1280V512H128zm512 1280h1280v-768h-384v384H640v384z" />
    </svg>
  ),
  displayName: 'ReopenPagesIcon',
});

export default ReopenPagesIcon;
