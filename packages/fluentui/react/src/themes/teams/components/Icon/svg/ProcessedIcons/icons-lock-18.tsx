import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M22.8 14.8v10.1H9.2V14.8h2.2v-3.3c0-.6.1-1.2.3-1.8s.5-1 .9-1.5.9-.7 1.4-1 1.1-.4 1.8-.4 1.2.1 1.8.4c.5.2 1 .6 1.4 1s.7.9.9 1.5.3 1.2.3 1.8v3.3h2.6zm-1.2 1.1H10.4v7.9h11.2v-7.9zm-9-1.1h6.8v-3.3c0-.5-.1-.9-.3-1.3s-.4-.9-.7-1.2c-.3-.3-.7-.6-1.1-.7-.4-.2-.8-.3-1.3-.3s-.9.1-1.3.3-.8.4-1.1.7-.5.7-.7 1.1-.3.9-.3 1.3v3.4z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
