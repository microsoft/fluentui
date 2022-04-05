import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const GalleryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M3 5.5C3 4.11929 4.11929 3 5.5 3H14.5C15.8807 3 17 4.11929 17 5.5V14.5C17 15.8807 15.8807 17 14.5 17H5.5C4.11929 17 3 15.8807 3 14.5V5.5ZM4 10.5V14.5C4 15.3284 4.67157 16 5.5 16H9.5V10.5H4ZM9.5 9.5V4H5.5C4.67157 4 4 4.67157 4 5.5V9.5H9.5ZM10.5 10.5V16H14.5C15.3284 16 16 15.3284 16 14.5V10.5H10.5ZM16 9.5V5.5C16 4.67157 15.3284 4 14.5 4H10.5V9.5H16Z"
      />
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M5.5 3C4.11929 3 3 4.11929 3 5.5V9.5H9.5V3H5.5Z" />
        <path d="M9.5 10.5H3V14.5C3 15.8807 4.11929 17 5.5 17H9.5V10.5Z" />
        <path d="M10.5 10.5H17V14.5C17 15.8807 15.8807 17 14.5 17H10.5V10.5Z" />
        <path d="M17 9.5V5.5C17 4.11929 15.8807 3 14.5 3H10.5V9.5H17Z" />
      </g>
    </svg>
  ),
  displayName: 'GalleryIcon',
});
