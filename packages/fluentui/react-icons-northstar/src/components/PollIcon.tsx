import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const PollIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4V16C12 17.1046 11.1046 18 10 18C8.89543 18 8 17.1046 8 16V4ZM10 3C9.44772 3 9 3.44772 9 4V16C9 16.5523 9.44772 17 10 17C10.5523 17 11 16.5523 11 16V4C11 3.44772 10.5523 3 10 3Z" />
        <path d="M2 12C2 10.8954 2.89543 10 4 10C5.10457 10 6 10.8954 6 12V16C6 17.1046 5.10457 18 4 18C2.89543 18 2 17.1046 2 16V12ZM4 11C3.44772 11 3 11.4477 3 12V16C3 16.5523 3.44772 17 4 17C4.55228 17 5 16.5523 5 16V12C5 11.4477 4.55228 11 4 11Z" />
        <path d="M16 6C14.8954 6 14 6.89543 14 8V16C14 17.1046 14.8954 18 16 18C17.1046 18 18 17.1046 18 16V8C18 6.89543 17.1046 6 16 6ZM15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8V16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16V8Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M10 2C8.89543 2 8 2.89543 8 4V16C8 17.1046 8.89543 18 10 18C11.1046 18 12 17.1046 12 16V4C12 2.89543 11.1046 2 10 2Z" />
        <path d="M4 10C2.89543 10 2 10.8954 2 12V16C2 17.1046 2.89543 18 4 18C5.10457 18 6 17.1046 6 16V12C6 10.8954 5.10457 10 4 10Z" />
        <path d="M16 6C14.8954 6 14 6.89543 14 8V16C14 17.1046 14.8954 18 16 18C17.1046 18 18 17.1046 18 16V8C18 6.89543 17.1046 6 16 6Z" />
      </g>
    </svg>
  ),
  displayName: 'PollIcon',
});
