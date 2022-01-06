import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const WindowMinimizeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 20 20" className={classes.svg}>
      <path className={classes.temp_8_8_16_16} d="M10 16v-1h12v1H10z" />
    </svg>
  ),
  displayName: 'WindowMinimizeIcon',
});
