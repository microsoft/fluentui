import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GlobalNavButtonIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 640H0V512h2048v128zm0 1024H0v-128h2048v128zm0-513H0v-127h2048v127z" />
    </svg>
  ),
  displayName: 'GlobalNavButtonIcon',
});

export default GlobalNavButtonIcon;
