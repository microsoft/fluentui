import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
          <path d="M16.5 8a8.5 8.5 0 1 0 8.5 8.5A8.51 8.51 0 0 0 16.5 8zm0 16a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
          <path d="M17 12.5h-1V16h-3.5v1H16v3.5h1V17h3.5v-1H17z" />
        </g>
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M16.5 8a8.5 8.5 0 1 0 8.5 8.5A8.51 8.51 0 0 0 16.5 8zm4 9H17v3.5h-1V17h-3.5v-1H16v-3.5h1V16h3.5z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
