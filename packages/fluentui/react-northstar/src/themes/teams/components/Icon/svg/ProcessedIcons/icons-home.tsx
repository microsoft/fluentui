import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M18.9 23c-.4 0-.8-.1-1-.3-.4-.4-.4-.9-.4-1.3V17c0-.2-.2-.5-.5-.5h-2c-.3 0-.5.3-.5.5v4.3c0 .4 0 .9-.4 1.3-.3.3-.8.4-1.6.3h-.2c-.7-.1-1.4-.2-2.1-.4-.7-.1-1.2-.7-1.2-1.5v-6.6c0-.6.3-.9.6-1.2L15 8.3l.1-.1c.5-.3 1.2-.3 1.7 0l.1.1 5.4 4.9c.3.2.7.6.7 1.2V21c0 .7-.5 1.3-1.2 1.5-.6.1-1.2.2-1.9.3l-.4.1c-.3.1-.4.1-.6.1zM15 15.5h2c.9 0 1.5.6 1.5 1.5v4.4c0 .1 0 .4.1.5 0 0 .1.1.7 0l.4-.1 1.8-.3c.3-.1.5-.3.5-.5v-6.6c0-.1-.1-.2-.3-.4l-5.4-4.9c-.2-.1-.4-.1-.6 0L10.3 14c-.2.2-.3.3-.3.5V21c0 .2.2.4.5.5.6.1 1.3.3 2 .4h.2c.6.1.7 0 .7 0 .1-.1.1-.4.1-.5V17c0-.9.6-1.5 1.5-1.5z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M18.9 23c-.4 0-.8-.1-1-.3-.4-.4-.4-.9-.4-1.3V17c0-.2-.2-.5-.5-.5h-2c-.3 0-.5.3-.5.5v4.3c0 .4 0 .9-.4 1.3-.3.3-.8.4-1.6.3h-.2c-.7-.1-1.4-.2-2.1-.4-.7-.1-1.2-.7-1.2-1.5v-6.6c0-.6.3-.9.6-1.2L15 8.3l.1-.1c.5-.3 1.2-.3 1.7 0l.1.1 5.4 4.9c.3.2.7.6.7 1.2V21c0 .7-.5 1.3-1.2 1.5-.6.1-1.2.2-1.9.3l-.4.1c-.3.1-.4.1-.6.1z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
