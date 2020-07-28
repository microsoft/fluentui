import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const EmailIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M22.5 11h-13c-.8 0-1.5.7-1.5 1.5v6.3c0 .7.5 1.3 1.1 1.5 1.9.4 4.5.7 6.9.7s5-.3 6.9-.7c.7-.2 1.1-.8 1.1-1.5v-6.3c0-.8-.7-1.5-1.5-1.5zm-13 1h13c.3 0 .5.2.5.5v.2l-6.7 4c-.2.1-.4.1-.6 0l-6.7-4v-.2c0-.3.2-.5.5-.5zm13.1 7.3c-1.8.4-4.3.7-6.6.7s-4.8-.3-6.6-.7c-.2-.1-.4-.3-.4-.5v-4.9l6.2 3.7c.2.2.5.2.8.2.3 0 .6-.1.8-.2l6.2-3.7v4.9c0 .2-.2.4-.4.5z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M15.711 16.72a.51.51 0 0 0 .56.012l7.702-4.503A1.5 1.5 0 0 0 22.5 11h-13a1.5 1.5 0 0 0-1.473 1.23l7.684 4.49z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M16.793 17.584c-.235.151-.51.228-.788.228-.282 0-.567-.08-.816-.239L8 13.371v5.423c0 .69.472 1.29 1.15 1.46 1.847.46 4.472.746 6.85.746s5.003-.286 6.851-.747A1.506 1.506 0 0 0 24 18.793v-5.421l-7.207 4.212z"
      />
    </svg>
  ),
  displayName: 'EmailIcon',
});
