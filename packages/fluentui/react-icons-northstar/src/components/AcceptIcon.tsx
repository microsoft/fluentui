import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const AcceptIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M14.3 21.3c-.1 0-.3 0-.4-.1l-4.8-4.8c-.2-.2-.2-.5 0-.7s.5-.2.7 0l4.4 4.4 7.9-7.9c.2-.2.5-.2.7 0s.2.5 0 .7l-8.3 8.3s-.1.1-.2.1z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M23.5 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z"
        />
      </g>
    </svg>
  ),
  displayName: 'AcceptIcon',
});
