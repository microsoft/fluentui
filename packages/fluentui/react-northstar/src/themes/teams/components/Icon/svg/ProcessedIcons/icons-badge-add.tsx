import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
          <path d="M16 17a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm0-3a1 1 0 1 0 1 1 1 1 0 0 0-1-1zM23 21h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" />
          <path d="M15.5 23h-5a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5h3v1h5v-1h3a.5.5 0 0 1 .5.5V17a.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5v-6.5A1.5 1.5 0 0 0 21.5 9h-3V8h-5v1h-3A1.5 1.5 0 0 0 9 10.5v12a1.5 1.5 0 0 0 1.5 1.5h5a.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5zm-1-14h3v1h-3z" />
          <path d="M15.543 20.234c-1.331-.1-2.376-.6-2.525-1.234H18a.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5h-5.5a.5.5 0 0 0-.5.5v.345c0 1.282 1.424 2.241 3.456 2.386a.505.505 0 0 0 .544-.5.5.5 0 0 0-.457-.497z" />
        </g>
        <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
          <circle cx="16" cy="15" r="2" />
          <path d="M15.5 23h-5a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5h3v1h5v-1h3a.5.5 0 0 1 .5.5V17a.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5v-6.5A1.5 1.5 0 0 0 21.5 9h-3V8h-5v1h-3A1.5 1.5 0 0 0 9 10.5v12a1.5 1.5 0 0 0 1.5 1.5h5a.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5z" />
          <path d="M16.5 20.625a1 1 0 0 1 1-1h1V18h-6a.5.5 0 0 0-.5.5v.345c0 1.394 1.682 2.405 4 2.405.171 0 .337-.007.5-.017zM23 21h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" />
        </g>
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
