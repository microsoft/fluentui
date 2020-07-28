import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const MicOffIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M11.6 18.3c-.4-.7-.6-1.5-.6-2.3 0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 1.1.3 2.2.9 3.1l.7-.8zm4.4.7c1.7 0 3-1.3 3-3v-2.3l4.9-4.9c.2-.2.2-.5 0-.7s-.5-.2-.7 0l-15 15c-.2.2-.2.5 0 .7 0 .2.2.2.3.2s.3 0 .4-.1l3.3-3.3c.9.8 2.1 1.3 3.4 1.4v1.5c0 .3.2.5.5.5s.5-.2.5-.5V22c3.1-.3 5.5-2.8 5.5-6 0-.3-.2-.5-.5-.5s-.6.2-.6.5c0 2.8-2.2 5-5 5-1.2 0-2.3-.4-3.2-1.1l1.4-1.4c.6.3 1.2.5 1.8.5zm2-3c0 1.1-.9 2-2 2-.4 0-.7-.1-1-.3l3-3V16zm-4-.1V11c0-1.1.9-2 2-2s2 .9 2 2v.9l1-1C19 9.3 17.6 8 16 8c-1.7 0-3 1.3-3 3v5c0 .3 0 .6.1.8l.9-.9z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M11.6 18.3c-.4-.7-.6-1.5-.6-2.3 0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 1.1.3 2.2.9 3.1l.7-.8zm4.4.7c1.7 0 3-1.3 3-3v-2.3l4.9-4.9c.2-.2.2-.5 0-.7s-.5-.2-.7 0l-15 15c-.2.2-.2.5 0 .7 0 .2.2.2.3.2s.3 0 .4-.1l3.3-3.3c.9.8 2.1 1.3 3.4 1.4v1.5c0 .3.2.5.5.5s.5-.2.5-.5V22c3.1-.3 5.5-2.8 5.5-6 0-.3-.2-.5-.5-.5s-.6.2-.6.5c0 2.8-2.2 5-5 5-1.2 0-2.3-.4-3.2-1.1l1.4-1.4c.6.3 1.2.5 1.8.5zm3-8.1C19 9.3 17.6 8 16 8c-1.7 0-3 1.3-3 3v5c0 .3 0 .6.1.8l5.9-5.9z"
      />
    </svg>
  ),
  displayName: 'MicOffIcon',
});
