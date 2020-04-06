import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <path d="M14.5 11h-2c-.8 0-1.5.7-1.5 1.5v7c0 .8.7 1.5 1.5 1.5h2c.3 0 .5-.2.5-.5v-9c0-.3-.2-.5-.5-.5zm5 0h-2c-.3 0-.5.2-.5.5v9c0 .3.2.5.5.5h2c.8 0 1.5-.7 1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'hold',
} as TeamsProcessedSvgIconSpec;
