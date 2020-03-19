import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
          <path d="M11 16c0-2.757 2.243-5 5-5 1.062 0 2.08.355 2.932.975h-.904a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-1.5 0v.742A6.994 6.994 0 0 0 16 9c-3.86 0-7 3.14-7 7a1 1 0 0 0 2 0zM22 15a1 1 0 0 0-1 1 4.996 4.996 0 1 1-7.964 4.024h.936a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-.74A6.994 6.994 0 0 0 16 23c3.86 0 7-3.14 7-7a1 1 0 0 0-1-1z" />
        </g>
        <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
          <path d="M22.502 15.5a.5.5 0 0 0-.5.5 6.016 6.016 0 0 1-4.39 5.78A5.963 5.963 0 0 1 11.527 20H13.5a.5.5 0 1 0 0-1h-3a.5.5 0 0 0-.5.5v3a.5.5 0 1 0 1 0v-1.614a6.94 6.94 0 0 0 6.882 1.856A7.019 7.019 0 0 0 23.002 16a.5.5 0 0 0-.5-.5zM14.388 10.22A5.998 5.998 0 0 1 20.459 12H18.5a.5.5 0 1 0 0 1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 1 0-1 0v1.608a6.997 6.997 0 0 0-6.88-1.85c-3.01.839-5.115 3.61-5.12 6.741a.5.5 0 0 0 .499.501H9.5a.5.5 0 0 0 .5-.499 6.028 6.028 0 0 1 4.388-5.78z" />
        </g>
      </g>
    </svg>
  ),
  styles: {},
  exportedAs: 'sync',
} as TeamsProcessedSvgIconSpec;
