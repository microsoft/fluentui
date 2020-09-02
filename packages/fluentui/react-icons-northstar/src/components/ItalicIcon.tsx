import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ItalicIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M22 9h-7a.5.5 0 1 0 0 1h2.746l-5.077 12H10.5a.5.5 0 1 0 0 1h7a.5.5 0 1 0 0-1h-3.746l5.077-12H22a.5.5 0 1 0 0-1z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M22 8.5h-7a1 1 0 0 0 0 2h1.991l-4.654 11H10.5a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2h-2.991l4.654-11H22a1 1 0 0 0 0-2z"
        />
      </g>
    </svg>
  ),
  displayName: 'ItalicIcon',
});
