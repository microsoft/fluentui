import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M20.5 9H19v-.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V9h-1.5v-.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V9H14v-.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V9h-1.5c-.8 0-1.5.7-1.5 1.5v12c0 .8.7 1.5 1.5 1.5h6.1c.4 0 .8-.2 1.1-.4l2.9-2.9c.3-.3.4-.7.4-1.1v-9.1c0-.8-.7-1.5-1.5-1.5zM18 22.8V20h2.8L18 22.8zm3-3.8h-4v4h-5.5c-.3 0-.5-.2-.5-.5v-12c0-.3.2-.5.5-.5H13v1.5c0 .3.2.5.5.5s.5-.2.5-.5V10h1.5v1.5c0 .3.2.5.5.5s.5-.2.5-.5V10H18v1.5c0 .3.2.5.5.5s.5-.2.5-.5V10h1.5c.3 0 .5.2.5.5V19z"
      />
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M12.5 14h7v1h-7zM12.5 16h7v1h-7zM12.5 18h4v1h-4z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M17 19h5v-8.5c0-.8-.7-1.5-1.5-1.5H19v-.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V9h-1.5v-.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V9H14v-.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V9h-1.5c-.8 0-1.5.7-1.5 1.5v12c0 .8.7 1.5 1.5 1.5H17v-5zm-4.5-5h7v1h-7v-1zm0 2h7v1h-7v-1zm0 3v-1h4v1h-4zm5.5 1v3.9c.2-.1.5-.2.6-.4l2.9-2.9c.2-.2.3-.4.4-.6H18z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
