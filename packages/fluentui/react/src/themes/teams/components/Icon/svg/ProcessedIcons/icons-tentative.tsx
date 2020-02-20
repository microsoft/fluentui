import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M15.8 10c-.8 0-1.7.2-2.4.7-.2.1-.3.5-.2.7.1.2.5.3.7.2.6-.4 1.2-.6 1.9-.6 1.8 0 2 1.2 2 1.6 0 1-.9 1.7-1 1.9-.3.3-1.4 1.1-1.4 2.2v.8c0 .3.2.5.5.5s.5-.2.5-.5v-.8c0-1.1 2.4-1.9 2.4-4.1 0-2.2-2.2-2.6-3-2.6z" />
      <circle cx="16" cy="20.8" r=".8" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
