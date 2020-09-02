import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ArrowLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M9.1 15.9l4 4c.2.2.5.2.7 0s.2-.5 0-.7L10.7 16h11.8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H10.7l3.1-3.1c.2-.2.2-.5 0-.7 0-.2-.2-.2-.3-.2s-.3 0-.4.1l-4 4c-.1.2-.1.6 0 .8z" />
    </svg>
  ),
  displayName: 'ArrowLeftIcon',
});
