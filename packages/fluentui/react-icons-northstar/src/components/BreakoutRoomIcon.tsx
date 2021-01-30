import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const BreakoutRoomIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H10.6458C10.9698 16.714 11.2471 16.3764 11.4649 16H14C15.1046 16 16 15.1046 16 14V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V8.53513C3.62359 8.75287 3.28596 9.03018 3 9.35418V6ZM6 9C4.34315 9 3 10.3431 3 12V14C3 15.6569 4.34315 17 6 17H8C9.65685 17 11 15.6569 11 14V12C11 10.3431 9.65685 9 8 9H6ZM4 12C4 10.8954 4.89543 10 6 10H8C9.10457 10 10 10.8954 10 12V14C10 15.1046 9.10457 16 8 16H6C4.89543 16 4 15.1046 4 14V12Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H10.6458C11.4762 16.2671 12 15.1947 12 14V12C12 9.79086 10.2091 8 8 8H6C4.80531 8 3.73294 8.52375 3 9.35418V6ZM6 9C4.34315 9 3 10.3431 3 12V14C3 15.6569 4.34315 17 6 17H8C9.65685 17 11 15.6569 11 14V12C11 10.3431 9.65685 9 8 9H6Z"
      />
    </svg>
  ),
  displayName: 'BreakoutRoomIcon',
});
