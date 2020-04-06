import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(teamsIconClassNames.outline, classes.outlinePart)}
          d="M23.7 12c-.2-.1-.4 0-.5.1l-2.5 2.4c-.5.4-.7 1-.7 1.5s.2 1.1.6 1.4l2.5 2.4c.1.1.2.1.3.1h.2c.2-.1.3-.3.3-.5v-7c.1-.1 0-.3-.2-.4zm-.7 6.3l-1.7-1.6c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7l1.7-1.6v4.6zM17.5 11H9.8c-.7 0-1.3.5-1.5 1.3-.2 1.2-.3 2.4-.3 3.7s.1 2.5.4 3.7c.1.8.7 1.3 1.4 1.3h7.7c.8 0 1.5-.7 1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5zm.5 8.5c0 .3-.2.5-.5.5H9.8c-.2 0-.4-.2-.5-.5-.2-1.1-.3-2.3-.3-3.5s.1-2.4.3-3.5c.1-.3.3-.5.5-.5h7.7c.3 0 .5.2.5.5v7z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M23.7 12c-.2-.1-.4 0-.5.1l-2.5 2.4c-.5.4-.7 1-.7 1.5s.2 1.1.6 1.4l2.5 2.4c.1.1.2.1.3.1h.2c.2-.1.3-.3.3-.5v-7c.1-.1 0-.3-.2-.4zm-6.2-1H9.8c-.7 0-1.3.5-1.5 1.3-.2 1.2-.3 2.4-.3 3.7s.1 2.5.4 3.7c.1.8.7 1.3 1.4 1.3h7.7c.8 0 1.5-.7 1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
