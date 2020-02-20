import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <circle className={classes.brandPath} cx="16" cy="16" r="8" />
      <path
        className={classes.secondaryPath}
        d="M19.89 13.172a.5.5 0 0 0-.708 0l-4.596 4.596L12.818 16a.5.5 0 1 0-.707.707l2.121 2.121a.5.5 0 0 0 .707 0l4.95-4.95a.5.5 0 0 0 0-.706z"
      />
    </svg>
  ),
  styles: {
    brandPath: ({ variables: v }) => ({
      fill: v.brandColor,
    }),
    secondaryPath: ({ variables: v }) => ({
      fill: v.secondaryColor,
    }),
  },
} as TeamsProcessedSvgIconSpec;
