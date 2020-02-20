import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
        <path d="M12.5 17h7c.827 0 1.5-.673 1.5-1.5v-4c0-.827-.673-1.5-1.5-1.5h-3V8.5a.5.5 0 0 0-1 0V10h-3c-.827 0-1.5.673-1.5 1.5v4c0 .827.673 1.5 1.5 1.5zm-.5-5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-4z" />
        <circle cx="14" cy="13" r="1" />
        <circle cx="18" cy="13" r="1" />
        <path d="M22.5 18h-13a.5.5 0 0 0-.5.5v.575c0 2.413 3.522 3.675 7 3.675 4.122 0 7-1.511 7-3.675V18.5a.5.5 0 0 0-.5-.5zm-.5 1.075c0 1.525-2.58 2.675-6 2.675-3.365 0-6-1.175-6-2.675V19h12v.075z" />
      </g>
    </svg>
  ),
  styles: {},
  exportedAs: 'robot',
} as TeamsProcessedSvgIconSpec;
