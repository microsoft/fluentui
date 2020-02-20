import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M16 23c-3.5 0-7-1.3-7-3.9v-.6c0-.3.2-.5.5-.5h13c.3 0 .5.2.5.5v.6c0 2.3-2.9 3.9-7 3.9zm-6-4v.1c0 1.6 2.6 2.9 6 2.9s6-1.2 6-2.9V19H10zm6-3c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
