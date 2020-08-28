import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const UnderlineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M16 21c-2.757 0-5-2.243-5-5V9.5a.5.5 0 1 1 1 0V16c0 2.206 1.794 4 4 4s4-1.794 4-4V9.5a.5.5 0 1 1 1 0V16c0 2.757-2.243 5-5 5zm4.5 3h-9a.5.5 0 1 1 0-1h9a.5.5 0 1 1 0 1z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M16 21.507a5.506 5.506 0 0 1-5.5-5.5v-6.5a1 1 0 0 1 2 0v6.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5v-6.5a1 1 0 0 1 2 0v6.5c0 3.033-2.467 5.5-5.5 5.5zm4.5 2.486h-9a.5.5 0 1 1 0-1h9a.5.5 0 1 1 0 1z"
        />
      </g>
    </svg>
  ),
  displayName: 'UnderlineIcon',
});
