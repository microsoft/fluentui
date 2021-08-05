import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const XboxOneConsoleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 512v896H256v-256H0V512h2048zm-128 640H384v128h1536v-128zm0-128V640H128v384h1792zm-320-256q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19z" />
    </svg>
  ),
  displayName: 'XboxOneConsoleIcon',
});

export default XboxOneConsoleIcon;
