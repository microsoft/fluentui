import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const GalleryNewLargeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM4 14.5V13H7V16H5.5L5.35554 15.9931C4.59489 15.9204 4 15.2797 4 14.5ZM12 13H8V16H12V13ZM14.5 16H13V13H16V14.5L15.9931 14.6445C15.9204 15.4051 15.2797 16 14.5 16ZM12 8H8V12H12V8ZM13 8H16V12H13V8ZM12 4H8V7H12V4ZM13 4H14.5L14.6445 4.00687C15.4051 4.07955 16 4.7203 16 5.5V7H13V4ZM7 4H5.5C4.7203 4 4.07955 4.59489 4.00687 5.35554L4 5.5V7H7V4ZM7 8V12H4V8H7Z"
      />
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M13 17H14.5C15.8807 17 17 15.8807 17 14.5V13H13V17Z" />
        <path d="M13 12V8H17V12H13Z" />
        <path d="M12 12H8V8H12V12Z" />
        <path d="M8 13H12V17H8V13Z" />
        <path d="M7 12V8H3V12H7Z" />
        <path d="M3 13H7V17H5.5C4.11929 17 3 15.8807 3 14.5V13Z" />
        <path d="M13 7H17V5.5C17 4.11929 15.8807 3 14.5 3H13V7Z" />
        <path d="M12 3V7H8V3H12Z" />
        <path d="M7 3V7H3V5.5C3 4.11929 4.11929 3 5.5 3H7Z" />
      </g>
    </svg>
  ),
  displayName: 'GalleryNewLargeIcon',
});
