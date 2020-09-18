import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ContactGroupIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M10 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-9 8.9c0 1.3 1.2 2.1 3 2.1 1.9 0 3-.8 3-2.1V15h-6v5.9zm1-4.9h4v4.9c0 1-1.7 1.1-2 1.1s-2-.1-2-1.1V16zm6 .5c0 .3.2.5.5.5H23v2c0 1-1.7 1.1-2 1.1h-.5c-.3 0-.5.2-.5.5s.2.5.5.5h.5c1.9 0 3-.8 3-2.1v-3h-3.5c-.3 0-.5.2-.5.5zm-8.5.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H8v3c0 1.3 1.1 2.1 3 2.1h.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H11c-.3 0-2-.1-2-1.1v-2h2.5z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M13 20.9c0 1.3 1.2 2.1 3 2.1 1.9 0 3-.8 3-2.1V15h-6v5.9zm7 .2h1c1.9 0 3-.8 3-2.1v-3h-4v5.1zM8 19c0 1.3 1.1 2.1 3 2.1h1V16H8v3z"
      />
      <circle className={cx(iconClassNames.filled, classes.filledPart)} cx="10" cy="13" r="2" />
      <circle className={cx(iconClassNames.filled, classes.filledPart)} cx="16" cy="12" r="2" />
      <circle className={cx(iconClassNames.filled, classes.filledPart)} cx="22" cy="13" r="2" />
    </svg>
  ),
  displayName: 'ContactGroupIcon',
});
