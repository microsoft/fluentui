import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const AppIconDefaultIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M0 0h1920v1024h-896v896H0V0zm896 1792v-768H128v768h768zm0-896V128H128v768h768zm896 0V128h-768v768h768z" />
    </svg>
  ),
  displayName: 'AppIconDefaultIcon',
});

export default AppIconDefaultIcon;
