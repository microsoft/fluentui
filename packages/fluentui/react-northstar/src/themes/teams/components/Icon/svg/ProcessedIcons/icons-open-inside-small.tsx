import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M19.9 20.4l-4.6-4.6H17c.2 0 .4-.2.4-.4s-.2-.4-.4-.4h-2.6-.1c-.1 0-.2.1-.2.2V18c0 .2.2.4.4.4s.4-.2.4-.4v-1.7l4.6 4.6c.1.1.2.1.3.1s.2 0 .3-.1c-.1-.2-.1-.4-.2-.5zm-4.8.6h-3c-.6 0-1.1-.5-1.1-1.1v-6.8c0-.6.5-1.1 1.1-1.1h6.8c.6 0 1.1.5 1.1 1.1v3c0 .2-.2.4-.4.4s-.4-.2-.4-.4v-3c0-.2-.2-.4-.4-.4H12c-.2 0-.4.2-.4.4v6.8c0 .2.2.4.4.4h3c.2 0 .4.2.4.4s-.1.3-.3.3z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
