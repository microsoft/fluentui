import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CalendarIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M21.5 10H19V9c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1h-4V9c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1h-2.5c-.8 0-1.5.7-1.5 1.5v9.4c0 .7.4 1.2 1.1 1.4 1.8.5 3.8.7 5.9.7s4.1-.2 5.9-.7c.6-.2 1.1-.7 1.1-1.4v-9.4c0-.8-.7-1.5-1.5-1.5zm.5 10.9c0 .2-.1.4-.3.4-3.5.9-7.8.9-11.3 0-.2 0-.3-.2-.3-.4v-9.4c0-.3.2-.5.5-.5H13v1c0 .3.2.5.5.5s.5-.2.5-.5v-1h4v1c0 .3.2.5.5.5s.5-.2.5-.5v-1h2.5c.3 0 .5.2.5.5v9.4z"
        />
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M12 14h2v2h-2zM15 14h2v2h-2zM15 17h2v2h-2zM12 17h2v2h-2zM18 14h2v2h-2z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M21.5 10H19V9c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1h-4V9c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1h-2.5c-.8 0-1.5.7-1.5 1.5v9.4c0 .7.4 1.2 1.1 1.4 1.8.5 3.8.7 5.9.7s4.1-.2 5.9-.7c.6-.2 1.1-.7 1.1-1.4v-9.4c0-.8-.7-1.5-1.5-1.5zM14 19h-2v-2h2v2zm0-3h-2v-2h2v2zm3 3h-2v-2h2v2zm0-3h-2v-2h2v2zm3 0h-2v-2h2v2z"
        />
      </g>
    </svg>
  ),
  displayName: 'CalendarIcon',
});
