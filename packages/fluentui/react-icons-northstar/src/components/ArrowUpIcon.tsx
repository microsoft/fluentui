import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ArrowUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M15.2 9.1l-4 4c-.2.2-.2.5 0 .7s.5.2.7 0l3.2-3.1v11.8c0 .3.2.5.5.5s.5-.2.5-.5V10.7l3.1 3.1c.2.2.5.2.7 0 .2 0 .2-.2.2-.3s0-.3-.1-.4l-4-4c-.2-.1-.6-.1-.8 0z" />
    </svg>
  ),
  displayName: 'ArrowUpIcon',
});
