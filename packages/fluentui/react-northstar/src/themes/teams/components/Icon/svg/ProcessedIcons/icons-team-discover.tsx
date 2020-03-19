import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M10 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-3 9c0 1.3 1.2 2 3 2 1.9 0 3-.7 3-2v-5h-6v5zm1-4h4v4c0 1-1.7 1.1-2 1.1s-2-.1-2-1.1v-4zm-2.5 1c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H8v3c0 1.3 1.1 2 3 2h.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H11c-.3 0-2 0-2-1v-2h2.5zm12-7H22V8.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V10h-1.5c-.3 0-.5.2-.5.5s.2.5.5.5H21v1.5c0 .3.2.5.5.5s.5-.2.5-.5V11h1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M10 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4.5 2H8v3c0 1.3 1.1 2 3 2h.5c.3 0 .5-.2.5-.5v-4c0-.3-.2-.5-.5-.5zm1.5 4c0 1.3 1.2 2 3 2 1.9 0 3-.7 3-2v-5h-6v5zm10.5-10H22V8.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V10h-1.5c-.3 0-.5.2-.5.5s.2.5.5.5H21v1.5c0 .3.2.5.5.5s.5-.2.5-.5V11h1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
