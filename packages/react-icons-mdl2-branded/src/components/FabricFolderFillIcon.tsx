import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FabricFolderFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1984 512v1024q0 26-19 45t-45 19H128q-26 0-45-19t-19-45V256q0-26 19-45t45-19h736q41 0 68 19t49 47 40 62 45 61 61 48 89 19h704q26 0 45 19t19 45z" />
    </svg>
  ),
  displayName: 'FabricFolderFillIcon',
});

export default FabricFolderFillIcon;
