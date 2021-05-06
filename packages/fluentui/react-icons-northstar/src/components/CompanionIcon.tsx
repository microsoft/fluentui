import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CompanionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="2 2 16 16" role="presentation" focusable="false">
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M6 3H16C16.5523 3 17 3.44772 17 4V11C17 11.5523 16.5523 12 16 12H9V13H12V15H9V16H14.5C14.7761 16 15 15.7761 15 15.5C15 15.2239 14.7761 15 14.5 15H13V13H16C17.1046 13 18 12.1046 18 11V4C18 2.89543 17.1046 2 16 2H6C4.89543 2 4 2.89543 4 4V7H5V4C5 3.44772 5.44772 3 6 3Z" />
        <path d="M4.5 15C4.22386 15 4 15.2239 4 15.5C4 15.7761 4.22386 16 4.5 16H5.5C5.77614 16 6 15.7761 6 15.5C6 15.2239 5.77614 15 5.5 15H4.5Z" />
        <path d="M2 9.5C2 8.67157 2.67157 8 3.5 8H6.5C7.32843 8 8 8.67157 8 9.5V16.5C8 17.3284 7.32843 18 6.5 18H3.5C2.67157 18 2 17.3284 2 16.5V9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5V16.5C3 16.7761 3.22386 17 3.5 17H6.5C6.77614 17 7 16.7761 7 16.5V9.5C7 9.22386 6.77614 9 6.5 9H3.5Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M6 2C4.89543 2 4 2.89543 4 4V7H6.5C7.88071 7 9 8.11929 9 9.5V13H12V15H9V16H14.5C14.7761 16 15 15.7761 15 15.5C15 15.2239 14.7761 15 14.5 15H13V13H16C17.1046 13 18 12.1046 18 11V4C18 2.89543 17.1046 2 16 2H6Z" />
        <path d="M3.5 8C2.67157 8 2 8.67157 2 9.5V16.5C2 17.3284 2.67157 18 3.5 18H6.5C7.32843 18 8 17.3284 8 16.5V9.5C8 8.67157 7.32843 8 6.5 8H3.5ZM4 15.5C4 15.2239 4.22386 15 4.5 15H5.5C5.77614 15 6 15.2239 6 15.5C6 15.7761 5.77614 16 5.5 16H4.5C4.22386 16 4 15.7761 4 15.5Z" />
      </g>
    </svg>
  ),
  displayName: 'CompanionIcon',
});
