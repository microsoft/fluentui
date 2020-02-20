import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M16.5 9C12.4 9 9 12.4 9 16.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5S20.6 9 16.5 9zm0 14c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z" />
      <path d="M16.1 18.2l-2.2-2.3-.8.8 3 2.9 4.8-4.7-.8-.8z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
