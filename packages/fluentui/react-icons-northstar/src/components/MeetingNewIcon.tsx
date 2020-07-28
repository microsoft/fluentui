import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const MeetingNewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(iconClassNames.outline, classes.outlinePart)}>
          <path d="M12 14h2v2h-2zM12 17h2v2h-2zM15 14h2v2h-2zM15 17h2v2h-2zM18 14h2v2h-2z" />
          <path d="M18 21.909a24.274 24.274 0 0 1-7.638-.572.49.49 0 0 1-.362-.485V11.5a.5.5 0 0 1 .5-.5H13v1a.5.5 0 0 0 1 0v-1h4v1a.5.5 0 0 0 1 0v-1h2.5a.5.5 0 0 1 .5.5V17h1v-5.5a1.5 1.5 0 0 0-1.5-1.5H19V9a.5.5 0 0 0-1 0v1h-4V9a.5.5 0 0 0-1 0v1h-2.5A1.5 1.5 0 0 0 9 11.5v9.352a1.489 1.489 0 0 0 1.121 1.456A24.434 24.434 0 0 0 16 23c.677 0 1.342-.035 2-.085z" />
          <path d="M24 21h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z" />
        </g>
        <g className={cx(iconClassNames.filled, classes.filledPart)}>
          <path d="M17.5 20.5a3.99 3.99 0 0 1 5.5-3.7v-5.3a1.5 1.5 0 0 0-1.5-1.5H19V9a.5.5 0 0 0-1 0v1h-4V9a.5.5 0 0 0-1 0v1h-2.5A1.5 1.5 0 0 0 9 11.5v9.352a1.489 1.489 0 0 0 1.121 1.456A24.434 24.434 0 0 0 16 23c.783 0 1.55-.045 2.307-.113A3.965 3.965 0 0 1 17.5 20.5zM18 14h2v2h-2zm-4 5h-2v-2h2zm0-3h-2v-2h2zm3 3h-2v-2h2zm0-3h-2v-2h2z" />
          <path d="M24 21h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z" />
        </g>
      </g>
    </svg>
  ),
  displayName: 'MeetingNewIcon',
});
