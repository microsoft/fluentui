import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M21.5 10h-3c-.651 0-1.201.419-1.408 1H9.5c-.827 0-1.5.673-1.5 1.5v9c0 .827.673 1.5 1.5 1.5h12c.827 0 1.5-.673 1.5-1.5v-10c0-.827-.673-1.5-1.5-1.5zM17 12v2h-2v-2h2zm-3 0v2h-2v-2h2zm-5 .5a.5.5 0 0 1 .5-.5H11v2H9v-1.5zm13 9a.5.5 0 0 1-.5.5h-12a.5.5 0 0 1-.5-.5V15h9v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v10z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'tabs',
} as TeamsProcessedSvgIconSpec;
