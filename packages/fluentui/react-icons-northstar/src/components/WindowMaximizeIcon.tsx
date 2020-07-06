import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const WindowMaximizeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M10 10h12v12H10V10zm11 11V11H11v10h10z" />
    </svg>
  ),
  displayName: 'WindowMaximizeIcon',
});
