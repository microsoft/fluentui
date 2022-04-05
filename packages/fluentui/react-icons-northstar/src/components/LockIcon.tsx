import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const LockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path d="M10 2C11.6569 2 13 3.34315 13 5V6H14C15.1046 6 16 6.89543 16 8V15C16 16.1046 15.1046 17 14 17H6C4.89543 17 4 16.1046 4 15V8C4 6.89543 4.89543 6 6 6H7V5C7 3.34315 8.34315 2 10 2ZM14 7H6C5.44772 7 5 7.44772 5 8V15C5 15.5523 5.44772 16 6 16H14C14.5523 16 15 15.5523 15 15V8C15 7.44772 14.5523 7 14 7ZM10 10.5C10.5523 10.5 11 10.9477 11 11.5C11 12.0523 10.5523 12.5 10 12.5C9.44772 12.5 9 12.0523 9 11.5C9 10.9477 9.44772 10.5 10 10.5ZM10 3C8.89543 3 8 3.89543 8 5V6H12V5C12 3.89543 11.1046 3 10 3Z" />
    </svg>
  ),
  displayName: 'LockIcon',
});
