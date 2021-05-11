import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TranscriptIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M5.5 7C5.22386 7 5 7.22386 5 7.5C5 7.77614 5.22386 8 5.5 8H9.5C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7H5.5Z" />
        <path d="M5.5 9.5C5.22386 9.5 5 9.72386 5 10C5 10.2761 5.22386 10.5 5.5 10.5H12.5C12.7761 10.5 13 10.2761 13 10C13 9.72386 12.7761 9.5 12.5 9.5H5.5Z" />
        <path d="M5 12.5C5 12.2239 5.22386 12 5.5 12H10.5C10.7761 12 11 12.2239 11 12.5C11 12.7761 10.7761 13 10.5 13H5.5C5.22386 13 5 12.7761 5 12.5Z" />
        <path d="M4.5 4C3.11929 4 2 5.11929 2 6.5V13.5C2 14.8807 3.11929 16 4.5 16H15.5C16.8807 16 18 14.8807 18 13.5V6.5C18 5.11929 16.8807 4 15.5 4H4.5ZM3 6.5C3 5.67157 3.67157 5 4.5 5H15.5C16.3284 5 17 5.67157 17 6.5V13.5C17 14.3284 16.3284 15 15.5 15H4.5C3.67157 15 3 14.3284 3 13.5V6.5Z" />
      </g>
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M2 6.5C2 5.11929 3.11929 4 4.5 4H15.5C16.8807 4 18 5.11929 18 6.5V13.5C18 14.8807 16.8807 16 15.5 16H4.5C3.11929 16 2 14.8807 2 13.5V6.5ZM5.5 7C5.22386 7 5 7.22386 5 7.5C5 7.77614 5.22386 8 5.5 8H9.5C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7H5.5ZM5 10C5 10.2761 5.22386 10.5 5.5 10.5H12.5C12.7761 10.5 13 10.2761 13 10C13 9.72386 12.7761 9.5 12.5 9.5H5.5C5.22386 9.5 5 9.72386 5 10ZM5.5 12C5.22386 12 5 12.2239 5 12.5C5 12.7761 5.22386 13 5.5 13H10.5C10.7761 13 11 12.7761 11 12.5C11 12.2239 10.7761 12 10.5 12H5.5Z"
      />
    </svg>
  ),
  displayName: 'TranscriptIcon',
});
