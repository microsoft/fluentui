import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <g>
        <path d="M22.514 10.15a.5.5 0 0 0-.711.006C20 11.986 15.87 16.116 9.525 22.43a.5.5 0 1 0 .681.741l.028-.028 3.835-3.816 3.521 2.646a.5.5 0 0 0 .8-.4v-6.56a905.054 905.054 0 0 0 4.128-4.149.5.5 0 0 0-.004-.714zm-5.13 10.415l-2.6-1.955 2.6-2.593zM10.537 19.056h.963l1.01-1.006h-1.895a7.568 7.568 0 0 1 0-4.024h3.26a.5.5 0 0 0 .3-.1l3.206-2.414v1.671l1.006-1.006v-1.671a.5.5 0 0 0-.805-.4l-3.878 2.917h-3.167a.864.864 0 0 0-.847.587 8.538 8.538 0 0 0 0 4.862.876.876 0 0 0 .847.584z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
