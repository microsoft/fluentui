import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M13.5 23.5c-.1 0-.3 0-.4-.1-.2-.2-.2-.5 0-.7l6.6-6.6-6.6-6.6c-.2-.2-.2-.5 0-.7s.5-.2.7 0l7 7c.2.2.2.5 0 .7l-7 7h-.3z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
