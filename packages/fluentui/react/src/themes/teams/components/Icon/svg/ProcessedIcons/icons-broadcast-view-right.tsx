import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M8.857 20.571h14.286a.857.857 0 0 0 .857-.857v-7.428a.857.857 0 0 0-.857-.857H8.857a.857.857 0 0 0-.857.857v7.429a.857.857 0 0 0 .857.856zm3.857-8.584h10.473a.25.25 0 0 1 .25.25v7.5a.25.25 0 0 1-.25.25H12.714zM8.833 12h3.31v8h-3.31a.25.25 0 0 1-.25-.25v-7.5a.25.25 0 0 1 .25-.25z"
      />
      <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
        <path d="M8.857 20.571h14.286a.857.857 0 0 0 .857-.857v-7.428a.857.857 0 0 0-.857-.857H8.857a.857.857 0 0 0-.857.857v7.429a.857.857 0 0 0 .857.856zm-.286-8.286A.286.286 0 0 1 8.857 12h14.286a.286.286 0 0 1 .286.286v7.429a.286.286 0 0 1-.286.286H8.857a.286.286 0 0 1-.286-.286z" />
        <path d="M9.143 12.571h3v6.857h-3zm3.571 0h10.143v6.857H12.714z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
