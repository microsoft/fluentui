import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const AppIconDefaultListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1280 1664v-128h128v128h-128zm256 0v-128h512v128h-512zm-256 256v-128h128v128h-128zm256 0v-128h512v128h-512zm-256-512v-128h128v128h-128zm256-128h512v128h-512v-128zM1920 0v1024h-896v896H0V0h1920zM896 1792v-768H128v768h768zm0-896V128H128v768h768zm896 0V128h-768v768h768z" />
    </svg>
  ),
  displayName: 'AppIconDefaultListIcon',
});

export default AppIconDefaultListIcon;
