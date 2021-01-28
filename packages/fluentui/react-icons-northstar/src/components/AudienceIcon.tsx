import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const AudienceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M7 7a2 2 0 100-4 2 2 0 000 4zm0-1a1 1 0 110-2 1 1 0 010 2zM5 12a2 2 0 100-4 2 2 0 000 4zm0-1a1 1 0 110-2 1 1 0 010 2zM15 12a2 2 0 100-4 2 2 0 000 4zm0-1a1 1 0 110-2 1 1 0 010 2zM12 10a2 2 0 11-4 0 2 2 0 014 0zm-1 0a1 1 0 10-2 0 1 1 0 002 0zM2.5 13h3.585a1.498 1.498 0 00-.085.5v.5H3a2 2 0 003.161 1.628c.097.33.235.641.408.93A3 3 0 012 14v-.5a.5.5 0 01.5-.5zM15 17a2.986 2.986 0 01-1.569-.442c.173-.289.311-.6.408-.93A2 2 0 0017 14h-3v-.5c0-.175-.03-.344-.085-.5H17.5a.5.5 0 01.5.5v.5a3 3 0 01-3 3zM15 5a2 2 0 11-4 0 2 2 0 014 0zm-1 0a1 1 0 10-2 0 1 1 0 002 0zM7.5 13a.5.5 0 00-.5.5v1a3 3 0 106 0v-1a.5.5 0 00-.5-.5h-5zm.5 1h4v.5a2 2 0 11-4 0V14z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M7 7a2 2 0 100-4 2 2 0 000 4zM7 10a2 2 0 11-4 0 2 2 0 014 0zM15 12a2 2 0 100-4 2 2 0 000 4zM10 12a2 2 0 100-4 2 2 0 000 4zM6.085 13H2.5a.5.5 0 00-.5.5v.5a3 3 0 004.569 2.558A3.982 3.982 0 016 14.5v-1c0-.175.03-.344.085-.5zM13.431 16.558A3.982 3.982 0 0014 14.5v-1c0-.175-.03-.344-.085-.5H17.5a.5.5 0 01.5.5v.5a3 3 0 01-4.569 2.558zM13 7a2 2 0 100-4 2 2 0 000 4zM7.5 13a.5.5 0 00-.5.5v1a3 3 0 106 0v-1a.5.5 0 00-.5-.5h-5z" />
      </g>
    </svg>
  ),
  displayName: 'AudienceIcon',
});
