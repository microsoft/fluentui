import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M16.5 9.2c.2.1.3.2.4.4l1.7 3.5 3.8.6c.2 0 .4.1.6.3.2.2.2.4.2.6 0 .3-.1.5-.3.7L20.2 18l.6 3.8v.2c0 .3-.1.5-.3.7-.1.1-.2.2-.3.2s-.2.1-.3.1c-.2 0-.3 0-.5-.1L16 21.1l-3.4 1.8c-.1.1-.3.1-.5.1-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7v-.1-.1l.6-3.8L9 15.3c-.2-.2-.3-.4-.3-.7 0-.2.1-.5.2-.6.2-.2.4-.3.6-.3l3.8-.6L15 9.6c.1-.2.2-.3.4-.4s.4-.2.6-.2.4.1.5.2z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
