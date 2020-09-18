import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const BellIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M16 23.5c-1.1 0-2-.9-2-2 0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5 0 1.1-.9 2-2 2zm-.9-1.5c.2.3.5.5.9.5s.7-.2.9-.5h-1.8zm6.9-2H10c-.6 0-1-.4-1-1 0-.5.4-1 1-1s1-.4 1-.9v-4.3c0-1.3.6-2.6 1.6-3.5 1-1 2.5-1.4 3.9-1.3 2.5.3 4.5 2.4 4.5 5v4.1c0 .5.4.9 1 .9s1 .4 1 1-.4 1-1 1zM16 9c-1 0-2 .4-2.8 1.1-.8.7-1.2 1.7-1.2 2.7v4.3c0 1.1-.9 1.9-2 1.9h11.6c-.9-.2-1.6-1-1.6-1.9V13c0-2-1.6-3.8-3.6-4H16z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M17.5 21h-3c-.3 0-.5.2-.5.5 0 1.1.9 2 2 2s2-.9 2-2c0-.3-.2-.5-.5-.5zm4.5-3c-.6 0-1-.4-1-.9V13c0-2.6-2-4.7-4.5-5-1.5-.1-2.9.3-3.9 1.3-1 .9-1.6 2.2-1.6 3.5v4.3c0 .5-.4.9-1 .9s-1 .4-1 1c0 .5.4 1 1 1h12c.6 0 1-.4 1-1 0-.5-.4-1-1-1z"
      />
    </svg>
  ),
  displayName: 'BellIcon',
});
