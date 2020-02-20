import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
          <path d="M16 21.25c-2.318 0-4-1.011-4-2.405V18.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v.345c0 1.416-1.645 2.405-4 2.405zM13.018 19c.165.7 1.439 1.25 2.982 1.25 1.57 0 2.823-.538 2.983-1.25zM16 17a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm0-3a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
          <path d="M21.5 9h-3V8h-5v1h-3A1.5 1.5 0 0 0 9 10.5v12a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 21.5 9zm-4 0v1h-3V9zM22 22.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5h3v1h5v-1h3a.5.5 0 0 1 .5.5z" />
        </g>
        <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
          <path d="M19.5 18h-7a.5.5 0 0 0-.5.5v.345c0 1.394 1.682 2.405 4 2.405 2.355 0 4-.989 4-2.405V18.5a.5.5 0 0 0-.5-.5z" />
          <circle cx="16" cy="15" r="2" />
          <path d="M21.5 9h-3V8h-5v1h-3A1.5 1.5 0 0 0 9 10.5v12a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 21.5 9zm.5 13.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5h3v1h5v-1h3a.5.5 0 0 1 .5.5z" />
        </g>
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
