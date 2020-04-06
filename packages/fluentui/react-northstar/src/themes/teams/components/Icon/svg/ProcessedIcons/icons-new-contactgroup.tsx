import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M18.5 12.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 1 0 0 1h6a.5.5 0 0 0 .5-.5zM21 17h-5.5a.5.5 0 1 0 0 1H21a.5.5 0 1 0 0-1zm0 5h-5.5a.5.5 0 1 0 0 1H21a.5.5 0 1 0 0-1zm2.5-12H22V8.5a.5.5 0 1 0-1 0V10h-1.5a.5.5 0 1 0 0 1H21v1.5a.5.5 0 1 0 1 0V11h1.5a.5.5 0 1 0 0-1z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M18.75 12.5a.75.75 0 0 0-.75-.75h-6a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 .75-.75zM21 16.75h-5.5a.75.75 0 0 0 0 1.5H21a.75.75 0 0 0 0-1.5zm0 5h-5.5a.75.75 0 0 0 0 1.5H21a.75.75 0 0 0 0-1.5zM23.5 10H22V8.5a.5.5 0 1 0-1 0V10h-1.5a.5.5 0 1 0 0 1H21v1.5a.5.5 0 1 0 1 0V11h1.5a.5.5 0 1 0 0-1z"
      />
      <circle className={cx(teamsIconClassNames.outline, classes.outlinePart)} cx="9" cy="12.5" r="1" />
      <circle className={cx(teamsIconClassNames.outline, classes.outlinePart)} cx="12.5" cy="17.5" r="1" />
      <circle className={cx(teamsIconClassNames.outline, classes.outlinePart)} cx="12.5" cy="22.5" r="1" />
      <circle className={cx(teamsIconClassNames.filled, classes.filledPart)} cx="9" cy="12.5" r="1" />
      <circle className={cx(teamsIconClassNames.filled, classes.filledPart)} cx="12.5" cy="17.5" r="1" />
      <circle className={cx(teamsIconClassNames.filled, classes.filledPart)} cx="12.5" cy="22.5" r="1" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
