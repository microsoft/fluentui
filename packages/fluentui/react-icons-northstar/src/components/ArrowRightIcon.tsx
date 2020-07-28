import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ArrowRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M22.9 15.1l-4-4c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l3.1 3.1H9.5c-.3.1-.5.3-.5.6s.2.5.5.5h11.8l-3.1 3.1c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0 .4-.1l4-4c0-.1 0-.5-.1-.7z" />
    </svg>
  ),
  displayName: 'ArrowRightIcon',
});
