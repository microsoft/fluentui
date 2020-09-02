import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ChatIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(iconClassNames.outline, classes.outlinePart)}>
          <path d="M22 23.5c-.3 0-.6-.1-.8-.4l-2.1-2.8c-.5.1-1.5.1-2.6.1-1.9 0-3.7-.2-5.3-.6-.7-.1-1.2-.8-1.2-1.4v-6.9c0-.8.7-1.5 1.5-1.5h10c.8 0 1.5.7 1.5 1.5v11c0 .4-.3.8-.7.9-.1.1-.2.1-.3.1zm-2.9-4.2c.3 0 .6.1.8.4l2.1 2.8v-11c0-.3-.2-.5-.5-.5h-10c-.3 0-.5.2-.5.5v6.9c0 .2.2.4.4.5 1.6.4 3.3.6 5.1.6 1-.1 2-.1 2.6-.2-.1 0 0 0 0 0z" />
          <path d="M13 13h6.5v1H13zM13 16h4v1h-4z" />
        </g>
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M21.5 10h-10c-.8 0-1.5.7-1.5 1.5v6.9c0 .6.5 1.3 1.2 1.4 1.6.4 3.4.6 5.3.6 1.1 0 2.1 0 2.6-.1l2.1 2.8c.2.3.5.4.8.4.1 0 .2 0 .3-.1.4-.1.7-.5.7-.9v-11c0-.8-.7-1.5-1.5-1.5zM17 17h-4v-1h4v1zm2.5-3H13v-1h6.5v1z"
        />
      </g>
    </svg>
  ),
  displayName: 'ChatIcon',
});
