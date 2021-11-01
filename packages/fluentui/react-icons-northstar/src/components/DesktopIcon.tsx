import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const DesktopIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M4 2C2.89543 2 2 2.89543 2 4V13C2 14.1046 2.89543 15 4 15H7V17H5.5C5.22386 17 5 17.2239 5 17.5C5 17.7761 5.22386 18 5.5 18H14.5C14.7761 18 15 17.7761 15 17.5C15 17.2239 14.7761 17 14.5 17H13V15H16C17.1046 15 18 14.1046 18 13V4C18 2.89543 17.1046 2 16 2H4ZM12 15V17H8V15H12ZM3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V13C17 13.5523 16.5523 14 16 14H4C3.44772 14 3 13.5523 3 13V4Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M3.5 2C2.67157 2 2 2.67157 2 3.5V13.5C2 14.3284 2.67157 15 3.5 15H7V17H5.5C5.22386 17 5 17.2239 5 17.5C5 17.7761 5.22386 18 5.5 18H14.5C14.7761 18 15 17.7761 15 17.5C15 17.2239 14.7761 17 14.5 17H13V15H16.5C17.3284 15 18 14.3284 18 13.5V3.5C18 2.67157 17.3284 2 16.5 2H3.5ZM12 15V17H8V15H12Z"
      />
    </svg>
  ),
  displayName: 'DesktopIcon',
});
