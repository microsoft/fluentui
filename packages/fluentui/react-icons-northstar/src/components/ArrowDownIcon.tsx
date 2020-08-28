import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ArrowDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M15.9 22.9l4-4c.2-.2.2-.5 0-.7s-.5-.2-.7 0L16 21.3V9.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5v11.8l-3.1-3.1c-.2-.2-.5-.2-.7 0-.2 0-.2.2-.2.3s0 .3.1.4l4 4c.2.1.6.1.8 0z" />
    </svg>
  ),
  displayName: 'ArrowDownIcon',
});
