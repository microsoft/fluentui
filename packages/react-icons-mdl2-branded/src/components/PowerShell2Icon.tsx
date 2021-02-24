import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const PowerShell2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M768 1664h1280v128H768v-128zM101 286l1033 738-1033 738-74-104 887-634L27 390l74-104z" />
    </svg>
  ),
  displayName: 'PowerShell2Icon',
});

export default PowerShell2Icon;
