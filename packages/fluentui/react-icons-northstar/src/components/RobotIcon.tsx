import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const RobotIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M16 8a.51.51 0 01.5.5V10h3a1.53 1.53 0 011.5 1.5v4a1.53 1.53 0 01-1.5 1.5h-7a1.54 1.54 0 01-1.5-1.5v-4a1.54 1.54 0 011.5-1.5h3V8.5A.51.51 0 0116 8zm6.5 10a.51.51 0 01.5.5v.58c0 3-4.76 3.67-7 3.67S9 22 9 19.08v-.58a.51.51 0 01.5-.5zM10 19c0 2.26 4.35 2.75 6 2.75s6-.45 6-2.75zm4-7a1 1 0 11-1 1 1 1 0 011-1zm-1.5-1a.51.51 0 00-.5.5v4a.51.51 0 00.5.5h7a.51.51 0 00.5-.5v-4a.51.51 0 00-.5-.5zm5.5 1a1 1 0 11-1 1 1 1 0 011-1z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M16 8a.51.51 0 01.5.5V10h3a1.53 1.53 0 011.5 1.5v4a1.53 1.53 0 01-1.5 1.5h-7a1.54 1.54 0 01-1.5-1.5v-4a1.54 1.54 0 011.5-1.5h3V8.5A.51.51 0 0116 8zm6.5 10a.51.51 0 01.5.5v.58c0 3-4.76 3.67-7 3.67S9 22 9 19.08v-.58a.51.51 0 01.5-.5zM14 12a1 1 0 101 1 1 1 0 00-1-1zm4 0a1 1 0 101 1 1 1 0 00-1-1z"
      />
    </svg>
  ),
  displayName: 'RobotIcon',
});
