import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const WindowsLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M0 268l768-107v735H0V268zM1920 0v896H896V143L1920 0zM896 1024h1024v896L896 1777v-753zm-896 0h768v735L0 1652v-628z" />
    </svg>
  ),
  displayName: 'WindowsLogoIcon',
});

export default WindowsLogoIcon;
