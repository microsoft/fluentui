import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M12 11h8v1h-8zM12 13h6v1h-6zM12 19h5v1h-5z" />
        <path d="M10.5 22a.5.5 0 0 1-.5-.5V17h12v2h1V9.5c0-.827-.673-1.5-1.5-1.5h-11c-.651 0-1.2.42-1.408 1H21.5a.5.5 0 0 1 .5.5V16H10v-2H9v7.5c0 .827.673 1.5 1.5 1.5H17l-1-1h-5.5z" />
        <circle cx="9.25" cy="11.5" r="1.25" />
        <path d="M23.5 21h-3.793l1.147-1.146a.5.5 0 1 0-.708-.708l-2 2a.5.5 0 0 0 0 .708l2 2a.498.498 0 0 0 .708 0 .5.5 0 0 0 0-.708L19.707 22H23.5a.5.5 0 1 0 0-1z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
