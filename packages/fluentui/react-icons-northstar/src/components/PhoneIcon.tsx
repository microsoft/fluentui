import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const PhoneIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M9 14C8.72386 14 8.5 14.2239 8.5 14.5C8.5 14.7761 8.72386 15 9 15H11C11.2761 15 11.5 14.7761 11.5 14.5C11.5 14.2239 11.2761 14 11 14H9Z" />
        <path d="M7 2C5.89543 2 5 2.89543 5 4V16C5 17.1046 5.89543 18 7 18H13C14.1046 18 15 17.1046 15 16V4C15 2.89543 14.1046 2 13 2H7ZM6 4C6 3.44772 6.44772 3 7 3H13C13.5523 3 14 3.44772 14 4V16C14 16.5523 13.5523 17 13 17H7C6.44772 17 6 16.5523 6 16V4Z" />
      </g>
      <path
        d="M6.5 2C5.67157 2 5 2.67157 5 3.5V16.5C5 17.3284 5.67157 18 6.5 18H13.5C14.3284 18 15 17.3284 15 16.5V3.5C15 2.67157 14.3284 2 13.5 2H6.5ZM9 14H11C11.2761 14 11.5 14.2239 11.5 14.5C11.5 14.7761 11.2761 15 11 15H9C8.72386 15 8.5 14.7761 8.5 14.5C8.5 14.2239 8.72386 14 9 14Z"
        className={cx(iconClassNames.filled, classes.filledPart)}
      />
    </svg>
  ),
  displayName: 'PhoneIcon',
});
