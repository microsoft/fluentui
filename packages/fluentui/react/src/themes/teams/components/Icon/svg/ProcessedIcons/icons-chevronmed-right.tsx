import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M14 21.5a.47.47 0 0 1-.35-.15.513.513 0 0 1 0-.71L18.29 16l-4.65-4.65c-.19-.19-.19-.51 0-.71s.51-.19.71 0l5 5c.19.19.19.51 0 .71l-5 5a.47.47 0 0 1-.35.15z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
