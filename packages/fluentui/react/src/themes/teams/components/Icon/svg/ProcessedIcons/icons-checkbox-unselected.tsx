import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M20.5 24h-9C9.57 24 8 22.43 8 20.5v-9C8 9.57 9.57 8 11.5 8h9c1.93 0 3.5 1.57 3.5 3.5v9c0 1.93-1.57 3.5-3.5 3.5zm-9-15A2.5 2.5 0 0 0 9 11.5v9a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 20.5 9h-9z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
