import * as React from 'react';

import { createSvgIcon } from '@fluentui/react-icons-northstar';

export const CodeSandboxIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 100 100" className={classes.svg}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81.8182 18.1818V81.8182H18.1818V18.1818H81.8182ZM10 90V10H90V90H10Z"
      />
    </svg>
  ),
  displayName: 'CodeSandboxIcon',
});
