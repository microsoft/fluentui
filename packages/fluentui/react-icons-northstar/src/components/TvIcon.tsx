// This is Fluent-style icon
import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TvIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 20 20" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M2 6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V13C18 14.1046 17.1046 15 16 15H4C2.89543 15 2 14.1046 2 13V6ZM4 5C3.44772 5 3 5.44772 3 6V13C3 13.5523 3.44772 14 4 14H16C16.5523 14 17 13.5523 17 13V6C17 5.44772 16.5523 5 16 5H4Z" />
        <path d="M5 16.5C5 16.2239 5.22386 16 5.5 16H14.5C14.7761 16 15 16.2239 15 16.5C15 16.7761 14.7761 17 14.5 17H5.5C5.22386 17 5 16.7761 5 16.5Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M2 6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V13C18 14.1046 17.1046 15 16 15H4C2.89543 15 2 14.1046 2 13V6Z" />
        <path d="M5.5 16C5.22386 16 5 16.2239 5 16.5C5 16.7761 5.22386 17 5.5 17H14.5C14.7761 17 15 16.7761 15 16.5C15 16.2239 14.7761 16 14.5 16H5.5Z" />
      </g>
    </svg>
  ),
  displayName: 'TvIcon',
});
