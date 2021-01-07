import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const MeetingNewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg
      style={{ overflow: 'visible' }}
      role="presentation"
      focusable="false"
      viewBox="2 2 16 16"
      className={classes.svg}
    >
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5 3C15.8807 3 17 4.11929 17 5.5V9.59971C16.6832 9.43777 16.3486 9.30564 16 9.20703V7H4V14.5C4 15.3284 4.67157 16 5.5 16H9.20703C9.30564 16.3486 9.43777 16.6832 9.59971 17H5.5C4.11929 17 3 15.8807 3 14.5V5.5C3 4.11929 4.11929 3 5.5 3H14.5ZM14.5 4H5.5C4.67157 4 4 4.67157 4 5.5V6H16V5.5C16 4.67157 15.3284 4 14.5 4Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 14.5C19 16.9853 16.9853 19 14.5 19C12.0147 19 10 16.9853 10 14.5C10 12.0147 12.0147 10 14.5 10C16.9853 10 19 12.0147 19 14.5ZM15 12.5C15 12.2239 14.7761 12 14.5 12C14.2239 12 14 12.2239 14 12.5V14H12.5C12.2239 14 12 14.2239 12 14.5C12 14.7761 12.2239 15 12.5 15H14V16.5C14 16.7761 14.2239 17 14.5 17C14.7761 17 15 16.7761 15 16.5V15H16.5C16.7761 15 17 14.7761 17 14.5C17 14.2239 16.7761 14 16.5 14H15V12.5Z"
        />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M17 7V9.59971C16.2499 9.21628 15.4002 9 14.5 9C11.4624 9 9 11.4624 9 14.5C9 15.4002 9.21628 16.2499 9.59971 17H5.5C4.11929 17 3 15.8807 3 14.5V7H17Z" />
        <path d="M14.5 3C15.8807 3 17 4.11929 17 5.5V6H3V5.5C3 4.11929 4.11929 3 5.5 3H14.5Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 14.5C19 16.9853 16.9853 19 14.5 19C12.0147 19 10 16.9853 10 14.5C10 12.0147 12.0147 10 14.5 10C16.9853 10 19 12.0147 19 14.5ZM15 12.5C15 12.2239 14.7761 12 14.5 12C14.2239 12 14 12.2239 14 12.5V14H12.5C12.2239 14 12 14.2239 12 14.5C12 14.7761 12.2239 15 12.5 15H14V16.5C14 16.7761 14.2239 17 14.5 17C14.7761 17 15 16.7761 15 16.5V15H16.5C16.7761 15 17 14.7761 17 14.5C17 14.2239 16.7761 14 16.5 14H15V12.5Z"
        />
      </g>
    </svg>
  ),
  displayName: 'MeetingNewIcon',
});
