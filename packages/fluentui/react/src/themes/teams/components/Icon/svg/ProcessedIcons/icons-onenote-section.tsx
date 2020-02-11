import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path fill="none" d="M4 4h24v24H4z" />
      <path
        d="M19 25h-1v-1a.92.92 0 0 0-1-1h-2.5a2.57 2.57 0 0 1-2.5-2.5v-9A2.57 2.57 0 0 1 14.5 9H17a.92.92 0 0 0 1-1V7h1z"
        fillRule="evenodd"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
