import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const PowerShellIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M0 128h2048v1664H0V128zm1920 128H128v128h1792V256zM128 1664h1792V512H128v1152zm768-128v-128h640v128H896zM549 716l521 372-521 372-74-104 375-268-375-268 74-104z" />
    </svg>
  ),
  displayName: 'PowerShellIcon',
});

export default PowerShellIcon;
