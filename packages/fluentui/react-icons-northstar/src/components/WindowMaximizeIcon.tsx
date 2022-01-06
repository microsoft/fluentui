import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const WindowMaximizeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 20 20" className={classes.svg}>
      <path className={classes.temp_8_8_16_16} d="M10 10h12v12H10V10zm11 11V11H11v10h10z" />
    </svg>
  ),
  displayName: 'WindowMaximizeIcon',
});
