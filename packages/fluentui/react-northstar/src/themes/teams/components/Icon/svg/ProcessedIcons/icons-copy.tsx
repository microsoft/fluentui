import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M23.6 14.87l-2.93-3.35c-.28-.33-.7-.51-1.13-.51h-1.7l-2.17-2.49A1.47 1.47 0 0 0 14.55 8H10.5C9.67 8 9 8.67 9 9.5v10c0 .83.67 1.5 1.5 1.5H14v1.5c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5v-6.61c0-.38-.14-.74-.4-1.02zM20 12.26L22.39 15H20v-2.74zM10.5 20c-.28 0-.5-.22-.5-.5v-10c0-.28.22-.5.5-.5h4.05c.14 0 .28.06.38.17L16.52 11H15.5c-.83 0-1.5.67-1.5 1.5V20h-3.5zm12 3h-7c-.28 0-.5-.22-.5-.5v-10c0-.28.22-.5.5-.5H19v4h4v6.5c0 .28-.22.5-.5.5z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M13 20h-2.5c-.28 0-.5-.22-.5-.5v-10c0-.28.22-.5.5-.5h4.05c.14 0 .28.06.38.17l.71.83h1.33l-1.3-1.49c-.28-.32-.69-.51-1.12-.51H10.5C9.67 8 9 8.67 9 9.5v10c0 .83.67 1.5 1.5 1.5H13v-1zm7-5h3.7c-.03-.04-.06-.09-.1-.13l-2.93-3.35c-.18-.21-.42-.35-.68-.43V15zm-1 1v-5h-3.5c-.83 0-1.5.67-1.5 1.5v10c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5V16h-5z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
