import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const WindowRestoreIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 20 20" className={classes.svg}>
      <path
        className={classes.temp_8_8_16_16}
        d="M11 9v2H9v12h12v-2h2V9H11zm9 13H10V12h10v10zm2-2h-1v-9h-9v-1h10v10z"
      />
    </svg>
  ),
  displayName: 'WindowRestoreIcon',
});
