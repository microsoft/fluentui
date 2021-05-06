import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const PresenceStrokeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 10 10" className={classes.svg}>
      <path d="M4.99869 1C2.79027 1 1 2.79027 1 4.99869C1 7.2071 2.79027 8.99738 4.99869 8.99738C7.2071 8.99738 8.99738 7.2071 8.99738 4.99869C8.99738 2.79027 7.2071 1 4.99869 1ZM0 4.99869C0 2.23799 2.23799 0 4.99869 0C7.75939 0 9.99738 2.23799 9.99738 4.99869C9.99738 7.75939 7.75939 9.99738 4.99869 9.99738C2.23799 9.99738 0 7.75939 0 4.99869Z" />
    </svg>
  ),
  displayName: 'PresenceStrokeIcon',
});
