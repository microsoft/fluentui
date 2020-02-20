import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M22.5 9h-13C8.673 9 8 9.673 8 10.5v9c0 .827.673 1.5 1.5 1.5H13a.5.5 0 1 0 0-1H9.5a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v9c0 .275-.225.5-.5.5H19a.5.5 0 1 0 0 1h3.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5z" />
      <path d="M19 18a1 1 0 0 0 .707-1.707l-3-3a1 1 0 0 0-1.09-.216 1 1 0 0 0-.324.216l-3 3a1 1 0 1 0 1.414 1.414L15 16.414V22.5a1 1 0 1 0 2 0v-6.086l1.293 1.293A.997.997 0 0 0 19 18z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'call-control-present-new',
} as TeamsProcessedSvgIconSpec
