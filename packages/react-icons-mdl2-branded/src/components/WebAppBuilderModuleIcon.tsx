import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const WebAppBuilderModuleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1536 128l512 896-512 896H512L0 1024l512-896h1024zm-74 1664l439-768-439-768H586l-439 768 439 768h876z" />
    </svg>
  ),
  displayName: 'WebAppBuilderModuleIcon',
});

export default WebAppBuilderModuleIcon;
