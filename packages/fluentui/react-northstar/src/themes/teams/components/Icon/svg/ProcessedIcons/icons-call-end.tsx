import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <path d="M23.4 15.6C21.3 13.9 18.7 13 16 13s-5.3.9-7.4 2.6c-.5.4-.7.9-.6 1.5 0 .1.2.5.2.5.4.6.9 1.4 1.9 1.2l.7-.1c1.1-.2 2.5-.8 2.7-2.1l.2-1.1h4.2l.2 1.1c.3 1.3 1.7 1.9 2.7 2l.7.1h.2c.7 0 1.1-.5 1.5-1l.4-.7c.5-.5.3-1-.2-1.4z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'call-end',
} as TeamsProcessedSvgIconSpec;
