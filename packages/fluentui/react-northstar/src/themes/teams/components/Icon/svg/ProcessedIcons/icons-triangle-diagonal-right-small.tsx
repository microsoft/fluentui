import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path opacity=".7" fill="#201f1f" d="M21 14l-7 7h7z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
