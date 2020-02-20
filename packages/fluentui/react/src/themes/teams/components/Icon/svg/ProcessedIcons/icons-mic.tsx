import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M16 19c1.7 0 3-1.3 3-3v-5c0-1.7-1.3-3-3-3s-3 1.3-3 3v5c0 1.7 1.3 3 3 3zm-2-8c0-1.1.9-2 2-2s2 .9 2 2v5c0 1.1-.9 2-2 2s-2-.9-2-2v-5zm8 5c0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 2.8-2.2 5-5 5s-5-2.2-5-5c0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 3.1 2.4 5.7 5.5 6v1.5c0 .3.2.5.5.5s.5-.2.5-.5V22c3.1-.3 5.5-2.9 5.5-6z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'mic',
} as TeamsProcessedSvgIconSpec;
