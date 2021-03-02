import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ScreenshareIcon = createSvgIcon({
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
          d="M13 10C13 8.34315 11.6569 7 10 7H4C2.34315 7 1 8.34315 1 10V16C1 17.6569 2.34315 19 4 19H10C11.6569 19 13 17.6569 13 16V10ZM10 8C11.1046 8 12 8.89543 12 10V16C12 17.1046 11.1046 18 10 18H4C2.89543 18 2 17.1046 2 16V10C2 8.89543 2.89543 8 4 8H10Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 4C19 2.34315 17.6569 1 16 1H10C8.34315 1 7 2.34315 7 4V6H8V4C8 2.89543 8.89543 2 10 2H16C17.1046 2 18 2.89543 18 4V10C18 11.1046 17.1046 12 16 12H14V13H16C17.6569 13 19 11.6569 19 10V4ZM13 13V12H12.5V13H13ZM8 7H7V7.5H8V7Z"
        />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 4C19 2.34315 17.6569 1 16 1H10C8.34315 1 7 2.34315 7 4V6H8V4C8 2.89543 8.89543 2 10 2H16C17.1046 2 18 2.89543 18 4V10C18 11.1046 17.1046 12 16 12H14V13H16C17.6569 13 19 11.6569 19 10V4ZM13 13V12H12.5V13H13ZM8 7H7V7.5H8V7Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 7C11.6569 7 13 8.34315 13 10V16C13 17.6569 11.6569 19 10 19H4C2.34315 19 1 17.6569 1 16V10C1 8.34315 2.34315 7 4 7H10Z"
        />
      </g>
    </svg>
  ),
  displayName: 'ScreenshareIcon',
});
