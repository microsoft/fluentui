import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ErrorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={classes.redPath}
        d="M23.7 20L17.6 9.7c-.1-.2-.3-.4-.5-.5-.2-.1-.4-.2-.7-.2-.2 0-.5.1-.7.2-.2.1-.4.3-.5.5L9.2 20c-.1.2-.2.4-.2.7 0 .4.1.7.4 1 .3.3.6.4 1 .4h12.1c.4 0 .7-.1 1-.4.3-.3.4-.6.4-1 0-.3-.1-.5-.2-.7zM16 12.6c0-.3.2-.5.5-.5s.5.2.5.5v4.7c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4.7zm.5 8.2c-.4 0-.8-.3-.8-.8 0-.4.3-.8.8-.8s.8.3.8.8c0 .4-.4.8-.8.8z"
      />
    </svg>
  ),
  displayName: 'ErrorIcon',
});
