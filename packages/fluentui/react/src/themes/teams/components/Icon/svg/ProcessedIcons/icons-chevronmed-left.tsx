import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M17.65 21.35l-5-5a.513.513 0 0 1 0-.71l5-5c.19-.19.51-.19.71 0 .19.19.19.51 0 .71L13.71 16l4.65 4.65c.19.19.19.51 0 .71-.1.1-.23.15-.35.15a.524.524 0 0 1-.36-.16z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
