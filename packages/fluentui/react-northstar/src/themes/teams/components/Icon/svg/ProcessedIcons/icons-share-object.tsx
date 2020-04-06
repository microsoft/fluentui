import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <g>
        <path
          className={cx(teamsIconClassNames.outline, classes.outlinePart)}
          d="M23 19.5v3a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 1 1 1 0V22h12v-2.5a.5.5 0 1 1 1 0zm.854-6.354l-3-3a.5.5 0 1 0-.707.707L22.293 13H18.5a6.508 6.508 0 0 0-6.5 6.5.5.5 0 1 0 1 0c0-3.032 2.468-5.5 5.5-5.5h3.793l-2.147 2.147a.5.5 0 1 0 .707.707l3-3a.5.5 0 0 0 0-.707z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M23 19.5v3a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 1 1 1 0V22h12v-2.5a.5.5 0 1 1 1 0zm.923-5.618a1 1 0 0 0-.217-1.09l-2.999-2.999a1 1 0 1 0-1.414 1.414l1.293 1.293H18.5A6.507 6.507 0 0 0 12 19a1 1 0 1 0 2 0c0-2.481 2.019-4.5 4.5-4.5h2.086l-1.293 1.293a1 1 0 1 0 1.414 1.414l2.999-2.999a1 1 0 0 0 .217-.326z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
