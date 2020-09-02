import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const PlugsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M22 9a1 1 0 011 1v3h1v4a4 4 0 01-1.18 3c-.21.2-.42.38-.63.59A.45.45 0 0022 21v2h-1v-2c0-1.47 2-1.45 2-4v-3h-6v3c0 2.57 2 2.54 2 4v2h-1v-2a.43.43 0 00-.19-.39c-.21-.21-.43-.38-.63-.59A4.1 4.1 0 0116 17v-4h1v-3a1 1 0 011-1zm-7 7.41V20h-1.5v2.5a.5.5 0 01-.5.5.51.51 0 01-.5-.5V20h-2v2.5a.5.5 0 01-.5.5.51.51 0 01-.5-.5V20H8v-3.59a1.48 1.48 0 01.45-1.06l1.41-1.41a.5.5 0 00.14-.35V9h1v4.59a1.52 1.52 0 01-.44 1.06l-1.41 1.41a.49.49 0 00-.15.35V19h5v-2.59a.49.49 0 00-.15-.35l-1.41-1.41a1.52 1.52 0 01-.44-1.06V9h1v4.59a.49.49 0 00.15.35l1.41 1.41a1.54 1.54 0 01.44 1.06zM18 10v3h4v-3z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M22 9a1 1 0 011 1v3h1v4a4.86 4.86 0 01-.4 1.92 4.79 4.79 0 01-1.41 1.69.45.45 0 00-.19.39v2h-4v-2a.45.45 0 00-.19-.39A4.33 4.33 0 0116 17v-4h1v-3a1 1 0 011-1zm-7 7.41V20h-1.5v2.5a.5.5 0 01-1 0V20h-2v2.5a.5.5 0 01-1 0V20H8v-3.59a1.54 1.54 0 01.44-1.06l1.41-1.41a.49.49 0 00.15-.35V9h3v4.59a.49.49 0 00.15.35l1.41 1.41a1.54 1.54 0 01.44 1.06zM18 10v3h4v-3z"
      />
    </svg>
  ),
  displayName: 'PlugsIcon',
});
