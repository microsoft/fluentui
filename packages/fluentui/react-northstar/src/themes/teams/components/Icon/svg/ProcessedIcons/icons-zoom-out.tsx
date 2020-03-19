import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M23.354 22.646l-4.63-4.63a5.509 5.509 0 1 0-.707.707l4.63 4.63a.5.5 0 0 0 .707-.707zM14.5 19a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5z"
      />
      <path className={cx(teamsIconClassNames.outline, classes.outlinePart)} d="M12 14h5v1h-5z" />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M23.354 22.646l-4.63-4.63a5.51 5.51 0 1 0-.707.707l4.63 4.63a.5.5 0 0 0 .707-.707zM17 15h-5v-1h5z"
      />
    </svg>
  ),
  styles: {},
  exportedAs: 'foo',
} as TeamsProcessedSvgIconSpec;
