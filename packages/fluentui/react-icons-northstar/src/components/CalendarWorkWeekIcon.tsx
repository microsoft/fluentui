import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CalendarWorkWeekIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M6.5 6C6.22386 6 6 6.22386 6 6.5V9.5C6 9.77614 6.22386 10 6.5 10H13.5C13.7761 10 14 9.77614 14 9.5V6.5C14 6.22386 13.7761 6 13.5 6H6.5ZM7 9V7H13V9H7Z" />
        <path d="M17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM5.5 4H14.5C15.3284 4 16 4.67157 16 5.5V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V5.5C4 4.67157 4.67157 4 5.5 4Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M7 9V7H13V9H7Z" />
        <path d="M17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM6.5 6H13.5C13.7761 6 14 6.22386 14 6.5V9.5C14 9.77614 13.7761 10 13.5 10H6.5C6.22386 10 6 9.77614 6 9.5V6.5C6 6.22386 6.22386 6 6.5 6Z" />
      </g>
    </svg>
  ),
  displayName: 'CalendarWorkWeekIcon',
});
