import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M16 8c-3.533 0-6 2.467-6 6 0 2.441 1.231 3.973 2.657 5.746l.451.565c1.403 1.768 2.458 3.44 2.47 3.456a.499.499 0 0 0 .845 0c.01-.017 1.066-1.688 2.469-3.456l.452-.565C20.769 17.973 22 16.441 22 14c0-3.533-2.468-6-6-6zm0 7.5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"
        />
        <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
          <path d="M16 11c-1.378 0-2.5 1.122-2.5 2.5S14.622 16 16 16c1.379 0 2.5-1.122 2.5-2.5S17.379 11 16 11zm0 4c-.827 0-1.5-.673-1.5-1.5S15.173 12 16 12s1.5.673 1.5 1.5S16.827 15 16 15z" />
          <path d="M16 8c-3.533 0-6 2.467-6 6 0 2.44 1.231 3.973 2.657 5.746l.451.565c1.403 1.768 2.458 3.44 2.47 3.456a.499.499 0 0 0 .845 0c.01-.017 1.066-1.688 2.469-3.456l.452-.565C20.769 17.973 22 16.441 22 14c0-3.533-2.467-6-6-6zm2.564 11.12l-.456.57A45.79 45.79 0 0 0 16 22.585a45.82 45.82 0 0 0-2.108-2.897l-.456-.569C12.022 17.36 11 16.09 11 14c0-2.489 1.546-5 5-5 3.454 0 5 2.511 5 5 0 2.089-1.021 3.36-2.436 5.12z" />
        </g>
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
