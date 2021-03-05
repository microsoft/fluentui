import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const WindowMinimizeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M10 16v-1h12v1H10z" />
    </svg>
  ),
  displayName: 'WindowMinimizeIcon',
});
