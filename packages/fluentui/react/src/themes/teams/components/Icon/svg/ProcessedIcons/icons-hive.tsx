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
          d="M16 0L2.144 8v16L16 32l13.856-8V8zm5.677 21.812H17.76V17.61h-3.583v4.202h-3.918v-11.72h3.918v4.135h3.583v-4.135h3.918z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M16 0L2.144 8v16L16 32l13.856-8V8zm5.677 21.812H17.76V17.61h-3.583v4.202h-3.918v-11.72h3.918v4.135h3.583v-4.135h3.918z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
