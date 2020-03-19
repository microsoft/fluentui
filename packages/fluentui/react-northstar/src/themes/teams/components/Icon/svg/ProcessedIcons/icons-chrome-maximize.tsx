import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M10 10h12v12H10V10zm11 11V11H11v10h10z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'window-maximize',
} as TeamsProcessedSvgIconSpec;
