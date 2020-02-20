import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M16 12.9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-1.6-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm7.9-2.4C22.4 12.1 19.3 10 16 10s-6.4 2.1-7.9 5.5c-.1.3-.1.7 0 1C9.6 19.9 12.7 22 16 22s6.4-2.1 7.9-5.5c.1-.3.1-.7 0-1zm-.9.6c-1.4 3-4 4.9-7 4.9s-5.6-1.9-7-4.9v-.2c1.4-3 4-4.9 7-4.9s5.6 1.9 7 4.9v.2zM16 13c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'eye',
} as TeamsProcessedSvgIconSpec
