import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M22.5 9h-13C8.673 9 8 9.673 8 10.5v9c0 .827.673 1.5 1.5 1.5h2.007a.5.5 0 1 0 0-1H9.5a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v9c0 .275-.225.5-.5.5h-2.066a.5.5 0 1 0 0 1H22.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5z" />
      <path d="M19.207 16.293a1 1 0 0 0-1.414 0L16 18.086l-1.793-1.793a1 1 0 1 0-1.414 1.414l1.793 1.793-1.793 1.793a1 1 0 1 0 1.414 1.414L16 20.914l1.793 1.793a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414L17.414 19.5l1.793-1.793a1 1 0 0 0 0-1.414z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'call-control-stop-presenting-new',
} as TeamsProcessedSvgIconSpec;
