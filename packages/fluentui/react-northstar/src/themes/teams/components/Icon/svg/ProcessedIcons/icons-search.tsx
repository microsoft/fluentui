import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M22.9 22.2l-4.4-4.4c.8-.9 1.3-2.1 1.3-3.4 0-3-2.4-5.4-5.4-5.4-3 0-5.4 2.4-5.4 5.4 0 3 2.4 5.4 5.4 5.4 1.3 0 2.5-.5 3.4-1.3l4.4 4.4c.1.1.2.1.3.1.1 0 .2 0 .3-.1.2-.2.2-.5.1-.7zm-13-7.8c0-2.4 2-4.4 4.4-4.4s4.4 2 4.4 4.4-2 4.4-4.4 4.4-4.4-2-4.4-4.4z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'search',
} as TeamsProcessedSvgIconSpec;
